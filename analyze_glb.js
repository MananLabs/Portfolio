import { NodeIO } from "@gltf-transform/core";

async function analyze() {
    const io = new NodeIO();
    const document = await io.read("public/models/spiderman.glb");
    const meshes = document.getRoot().listMeshes();
    console.log(`Total Meshes: ${meshes.length}`);
    meshes.forEach((mesh, mIdx) => {
        const primitives = mesh.listPrimitives();
        console.log(`Mesh ${mIdx}: ${primitives.length} primitives`);
        primitives.forEach((prim, pIdx) => {
            const pos = prim.getAttribute("POSITION");
            if (pos) {
                const count = pos.getCount();
                const min = pos.getMin();
                const max = pos.getMax();
                console.log(`  Primitive ${pIdx}:`);
                console.log(`    Vertex Count: ${count}`);
                console.log(`    Bounds: [${min}] to [${max}]`);
            }
        });
    });
}
analyze().catch(err => { console.error(err); process.exit(1); });
