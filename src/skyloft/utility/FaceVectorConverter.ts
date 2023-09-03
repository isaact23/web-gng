import { Vector3 } from "babylonjs";
import { Face } from "./Face";

// Vectors for each face (to get adjacent block)
const faceVectors = new Map<Face, Vector3>();
faceVectors.set(Face.Front, Vector3.Forward());
faceVectors.set(Face.Right, Vector3.Right());
faceVectors.set(Face.Top, Vector3.Up());
faceVectors.set(Face.Back, Vector3.Backward());
faceVectors.set(Face.Left, Vector3.Left());
faceVectors.set(Face.Bottom, Vector3.Down());

export class FaceVectorConverter {

    /**
     * Get the Vector3 corresponding to a face.
     * @param face The face to convert.
     * @returns The Vector3 corresponding to the input face.
     */
    static getVectorFromFace(face: Face): Vector3 {
        const vec = faceVectors.get(face);
        if (vec === undefined) {
            throw "Failed to get vector from face";
        }
        return vec;
    }

    /**
     * Get the face corresponding to a Vector3.
     * The vector must be perpendicular to the face.
     * 
     * @param vec The Vector3 to convert.
     * @returns A Face corresponding to the input Vector3, or undefined if
     *  no face corresponds to the vector.
     */
    static getFaceFromVector(vec: Vector3): Face | undefined {
        for (let face of Object.values(Face)) {
            if (typeof(face) === "string") continue;
        
            const dot = Vector3.Dot(vec, this.getVectorFromFace(face));
            if (dot > 0.999) return face;
        }
        
        return undefined;
    }
}
