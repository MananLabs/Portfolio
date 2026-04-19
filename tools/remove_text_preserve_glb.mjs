import { NodeIO } from "@gltf-transform/core";
import { ALL_EXTENSIONS } from "@gltf-transform/extensions";

async function process() {
    const io = new NodeIO().registerExtensions(ALL_EXTENSIONS);
    const document = await io.read("public/models/spiderman.glb");
    const root = document.getRoot();
    
    // Find the first mesh and primitive
    const mesh = root.listMeshes()[0];
    if (!mesh) throw new Error("No mesh found");
    const prim = mesh.listPrimitives()[0];
    if (!prim) throw new Error("No primitive found");

    const indices = prim.getIndices();
    const position = prim.getAttribute("POSITION");
    if (!indices || !position) throw new Error("Missing indices or positions");

    const indexData = indices.getArray();
    const posData = position.getArray();
    const triangleCount = indexData.length / 3;

    // 1. Build adjacency (connected components by vertex indices)
    // Map vertex index to list of triangle indices
    const vertexToTriangles = new Map();
    for (let i = 0; i < triangleCount; i++) {
        for (let j = 0; j < 3; j++) {
            const vIdx = indexData[i * 3 + j];
            if (!vertexToTriangles.has(vIdx)) vertexToTriangles.set(vIdx, []);
            vertexToTriangles.get(vIdx).push(i);
        }
    }

    const visited = new Set();
    const components = [];

    for (let i = 0; i < triangleCount; i++) {
        if (visited.has(i)) continue;
        
        const component = [];
        const queue = [i];
        visited.add(i);

        while (queue.length > 0) {
            const triIdx = queue.shift();
            component.push(triIdx);

            for (let j = 0; j < 3; j++) {
                const vIdx = indexData[triIdx * 3 + j];
                const neighbors = vertexToTriangles.get(vIdx);
                for (const nextTri of neighbors) {
                    if (!visited.has(nextTri)) {
                        visited.add(nextTri);
                        queue.push(nextTri);
                    }
                }
            }
        }
        components.push(component);
    }

    console.log(`Found ${components.length} connected components.`);

    // 2. Identify components to remove
    const keepTriangles = [];
    let removedTriCount = 0;

    for (const component of components) {
        let sumY = 0, sumZ = 0, sumX = 0;
        const vSet = new Set();
        for (const triIdx of component) {
            for (let j = 0; j < 3; j++) {
                const vIdx = indexData[triIdx * 3 + j];
                if (!vSet.has(vIdx)) {
                    vSet.add(vIdx);
                    sumX += posData[vIdx * 3];
                    sumY += posData[vIdx * 3 + 1];
                    sumZ += posData[vIdx * 3 + 2];
                }
            }
        }
        const avgX = sumX / vSet.size;
        const avgY = sumY / vSet.size;
        const avgZ = sumZ / vSet.size;
        
        // Conservative text region heuristics: 
        // Small components near top (high Y) and back/right (high Z/X)
        // Adjust these thresholds based on the model if needed
        const isSmall = component.length < 500; 
        const isHighY = avgY > 0.5; // Normalized coords typically, but check model scale
        const isBackRight = avgZ > 0.1 && avgX > 0.1;

        if (isSmall && isHighY && isBackRight) {
            removedTriCount += component.length;
        } else {
            keepTriangles.push(...component);
        }
    }

    console.log(`Removed ${removedTriCount} triangles.`);

    // 3. Rebuild geometry
    const newIndices = new Uint32Array(keepTriangles.length * 3);
    for (let i = 0; i < keepTriangles.length; i++) {
        newIndices[i * 3] = indexData[keepTriangles[i] * 3];
        newIndices[i * 3 + 1] = indexData[keepTriangles[i] * 3 + 1];
        newIndices[i * 3 + 2] = indexData[keepTriangles[i] * 3 + 2];
    }
    indices.setArray(newIndices);

    // Write output
    await io.write("public/models/spiderman_no_text.glb", document);
    console.log("Saved to public/models/spiderman_no_text.glb");
}

process().catch(console.error);
