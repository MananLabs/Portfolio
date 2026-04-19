import trimesh
import numpy as np
import os

input_path = "public/models/spiderman.glb"
output_path = "public/models/spiderman_no_text_candidate.glb"

if not os.path.exists(input_path):
    print(f"Error: {input_path} not found")
    exit(1)

# Load the scene
scene = trimesh.load(input_path)

# Ensure we are working with a mesh
if isinstance(scene, trimesh.Scene):
    # Some gltf files load as scenes. Concatenate into a single mesh for component analysis
    # or process each mesh. Text is often its own mesh or several small ones.
    mesh = scene.dump(concatenate=True)
else:
    mesh = scene

# Split into connected components
components = mesh.split(only_watertight=False)

print(f"Total components found: {len(components)}")

# Collect stats
stats = []
keep_components = []
removed_indices = []

# Define threshold for "small volume" or "top/back"
# Since we don't know the exact scale, we'll look at the distribution
for i, comp in enumerate(components):
    centroid = comp.centroid
    bounds = comp.bounds
    vol = comp.area # trimesh volume can be tricky for non-watertight, use area as proxy
    tri_count = len(comp.faces)
    
    stats.append({
        'index': i,
        'centroid': centroid.tolist(),
        'bounds': bounds.tolist(),
        'area': vol,
        'triangles': tri_count
    })
    
    # Identification logic:
    # Text on top/back usually has high Y (top) or low Z (back) and is relatively small compared to body
    # Let's flag small components with high centroid.y
    # We'll refine this if we see the output, but for now, let's use a simple heuristic
    # or just print them all first if we can't decide.
    # To follow instructions: "identifies likely... by centroid.y and small volume"
    # We'll calculate the 'body' as the largest component by triangle count/area
    
# Heuristic based on triangle distribution
sorted_by_size = sorted(stats, key=lambda x: x['triangles'], reverse=True)
main_body_tri_count = sorted_by_size[0]['triangles']

for i, s in enumerate(stats):
    is_text = False
    # If it's much smaller than the body
    if s['triangles'] < main_body_tri_count * 0.1:
        # And high up (top) - comparing y to max y
        # We need global max y
        pass

max_y = max(s['centroid'][1] for s in stats)
min_y = min(s['centroid'][1] for s in stats)
y_range = max_y - min_y

for i, s in enumerate(stats):
    is_text = False
    # Thresholds: Small triangles AND high centroid Y (top half)
    if s['triangles'] < main_body_tri_count * 0.05:
        if s['centroid'][1] > min_y + 0.7 * y_range:
           is_text = True
    
    if is_text:
        removed_indices.append(i)
        print(f"Component {i}: REMOVING (Detected as potential text). Centroid: {s['centroid']}, Tris: {s['triangles']}")
    else:
        keep_components.append(components[i])
        print(f"Component {i}: KEEPING. Centroid: {s['centroid']}, Tris: {s['triangles']}")

if keep_components:
    new_mesh = trimesh.util.concatenate(keep_components)
    new_mesh.export(output_path)
    print(f"Successfully exported to {output_path}")
else:
    print("Error: No components kept, export aborted.")

