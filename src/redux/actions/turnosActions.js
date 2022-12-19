import { addDoc, collection, getDocs } from "firebase/firestore";
import { dataBase } from "../../firebase/firebaseConfig";
import { turnosTypes } from "../types/turnosTypes";

const collectionName = 'turnos';

export const actionGetTurnosAsync = () => {
    return async (dispatch) => {
        const turnosCollection = collection(dataBase, collectionName);
        const querySnapshot = await getDocs(turnosCollection);
        const turnos = [];

        try {
            querySnapshot.forEach(element => {
                const turno = {
                    id: element.id,
                    ...element.data()
                }
                turnos.push(turno)
            });
        } catch (error) {
            console.log(error);
        } finally {
            dispatch(actionGetTurnosSync(turnos));
        }
    }
};

const actionGetTurnosSync = (turnos) => {
    return {
        type: turnosTypes.GET_TURNOS,
        payload: {
            turnos: turnos,
        },
    }
}

export const actionAddTurnoAsync = (turno) => {
    return async (dispatch) => {
        try {
            const turnosCollection = collection(dataBase, collectionName);
            const docs = await addDoc(turnosCollection, turno)
            dispatch(actionAddTurnoSync({ id: docs.id, ...turno }))

        } catch (error) {
            console.log(error);
            dispatch(actionAddTurnoSync({}))
        }


    }

}
const actionAddTurnoSync = (turno) => {
    return {
        type: turnosTypes.ADD_TURNO,
        payload: turno
    }
}