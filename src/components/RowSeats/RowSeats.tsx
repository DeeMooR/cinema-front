import React, { FC, useState } from 'react'
import './RowSeats.css'
import { useDispatch, useSelector } from 'react-redux'
import { SeatImage } from './styled'
import { IDataSeatSelect, IRoom, ISeance, ISeatType } from 'src/interfaces'
import { ADD_SEAT_SELECT, REMOVE_SEAT_SELECT } from 'src/actions/actions'
import { ThunkDispatch } from 'redux-thunk'
import { AnyAction } from 'redux'
import { useParams } from 'react-router-dom'

interface IRowSeats {
    arrRow: number[],
    room: number,
    indexRow: number,
    setModal: (v: JSX.Element) => void,
    setModalIsOpen: (v: boolean) => void
}

const RowSeats:FC<IRowSeats> = ({arrRow, room, indexRow, setModal, setModalIsOpen}) => {
    const {id, date, seance} = useParams<{id: string, date: string, seance: string}>();
    const newId = (id) ? +id : 0;
    const newSeance = (seance) ? +seance : 0;
    const dispatch = useDispatch<ThunkDispatch<any, {}, AnyAction>>();
    const arrRooms: IRoom[] = useSelector(({storePages}) => storePages.arrRooms);
    const arrSeatTypes: ISeatType[] = useSelector(({storePages}) => storePages.seatTypes);
    const arrSeances: ISeance[] = useSelector(({storePages}) => storePages.arrSeances);
    const arrSeatSelect = useSelector(({store}) => store.seatSelect);
    const userId = useSelector(({store}) => store.user.id);
    const token = localStorage.getItem('access');

    const objRoom = arrRooms.find((item) => item.room === room);              // объект room: room, costSingle, costSofa, rows
    const objRow = objRoom?.rows.find((item) => item.idRow === indexRow + 1);   // объект row:  idRow, type, seats
    const objType = arrSeatTypes.find((item: ISeatType) => item.type === objRow?.type);        // объект type: type, image, description

    const clickSeat = (number: number, indexRow: number, indexColumn: number) => {
        if (number === 1 || number === userId || (number !== -userId && number < 0)) return;
        if (!token) {
            setModalIsOpen(true);
            return;
        }

        const row = indexRow + 1;
        const column = indexColumn + 1;
        if (number === 0) {
            const objSeatSelect: IDataSeatSelect = {
                idMovie: newId,
                date: date || '',
                row: row,
                column: column,
                cost: (objType?.type && objRoom) ? (objType.type === "single" ? objRoom.costSingle : objRoom.costSofa) : 0,
                typeSeat: objType?.type || '',
                idSeance: newSeance
            }
            const newArrSeances = arrSeances.map((seance) => {
                if (seance.id === newSeance) {
                    const updatedRows = [...seance.places];
                    updatedRows[indexRow][indexColumn] = -userId;
                    return {
                        ...seance,
                        places: updatedRows,
                    };
                }
                return seance;
            });
            dispatch(ADD_SEAT_SELECT(userId, newArrSeances, objSeatSelect, setModal));
        } else {
            const newSeatSelect = arrSeatSelect.filter((item: IDataSeatSelect) => {
                return !(item.idSeance === newSeance && item.row === row && item.column === column);
            });
            const newArrSeances = arrSeances.map((seance) => {
                if (seance.id === newSeance) {
                    const updatedRows = [...seance.places];
                    updatedRows[indexRow][indexColumn] = 0;
                    return {
                        ...seance,
                        places: updatedRows,
                    };
                }
                return seance;
            });
            dispatch(REMOVE_SEAT_SELECT(userId, newArrSeances, newSeatSelect, setModal));
        }
    }

    return (
        <>
        {objType &&
            <div className='rowSeats'>
                <p className='rowSeats__number'>{indexRow + 1}</p>
                {arrRow.map((number, indexColumn) => (
                    <SeatImage
                        image={(number === -userId && token) ? objType.imageSelect : objType.image}
                        type={objType.type}
                        isEmpty={number === 0 ? true : false}
                        cursor={number === 0 || number == -userId ? 'pointer' : 'default'}
                        onClick={() => clickSeat(number, indexRow, indexColumn)}
                    />
                ))}
                <p className='rowSeats__number'>{indexRow + 1}</p>
            </div>
        }
        </>
    )
}

export default RowSeats
