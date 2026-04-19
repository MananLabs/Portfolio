import trimesh
import numpy as np

def analyze(path):
    scene = trimesh.load(path)
    # Correctly grab geometry from scene
    if hasattr(scene, 'geometry') and len(scene.geometry) > 0:
        meshes = list(scene.geometry.values())
        mesh = trimesh.util.concatenate(meshes)
    else:
        mesh = scene
    
    bounds = mesh.bounds
    centroid = mesh.centroid
    return bounds, centroid

files = ['public/models/spiderman.glb', 'public/models/spiderman_no_text_candidate.glb']
for f in files:
    try:
        b, c = analyze(f)
        print(f'{f}:')
        print(f'  Bounds Min: {b[0]}')
        print(f'  Bounds Max: {b[1]}')
        print(f'  Centroid: {c}')
    except Exception as e:
        print(f'Error analyzing {f}: {e}')
