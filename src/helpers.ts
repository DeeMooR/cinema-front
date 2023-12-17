import { addDays } from "date-fns";
import { IMovie } from "./interfaces";

const russianMonths = ['января','февраля','марта','апреля','мая','июня','июля','августа','сентября','октября','ноября','декабря'];
const arrDaysOfWeek = ['воскресенье', 'понедельник', 'вторник', 'среда', 'четверг', 'пятница', 'суббота'];

export const setTodayDate = () => {
    const date25 = new Date('2023-10-25');
    const currentTime = new Date();
    date25.setHours(currentTime.getHours());
    date25.setMinutes(currentTime.getMinutes());
    return date25;
}
const today = setTodayDate();

export const getTimePlusDuration = (date: string, duration: number) => {
    const [hours, minutes] = date.split(':').map(Number); 
    const newMinutes = minutes + duration;
    const newHours = hours + Math.floor(newMinutes / 60);
    const adjustedMinutes = newMinutes % 60;

    const newTime = `${newHours.toString().padStart(2, '0')}:${adjustedMinutes.toString().padStart(2, '0')}`;
    return newTime;
}

const getDatePoints = (date: Date) => {
    const day = date.getDate();
    const month = date.getMonth() + 1;
    const year = date.getFullYear();

    const formattedDate = `${day.toString().padStart(2, '0')}.${month.toString().padStart(2, '0')}.${year}`;
    return formattedDate;
}

export const getTodayDate = () => {
    const currentDay = today;
    return getDatePoints(currentDay);
};

export const getDateIn180 = () => {
    const future = today;
    future.setDate(future.getDate() + 180);
    return getDatePoints(future);
};

export const compareDayNowEnd = (end: string) => {
    function parseDate(dateString: any) {
        const parts = dateString.split(".");
        return new Date(parts[2], parts[1] - 1, parts[0]);
    }
    const dateToday = parseDate(getTodayDate());
    const dateEnd = parseDate(end);
    if (dateToday > dateEnd) return true;
    return false;
}
    
export const compareTimeNowStart = (strat: string) => {
    const currentTime = today;
    const [stratHours, stratMinutes] = strat.split(':').map(Number);
    const currentHours = currentTime.getHours();
    const currentMinutes = currentTime.getMinutes();
    if (currentHours > stratHours || (currentHours === stratHours && currentMinutes >= stratMinutes)) {
        return true;
    }
    return false;
}

export const getTodayDayMonthYear = () => {
    let currentDate = today;
    const day = currentDate.getDate().toString().padStart(2, '0');
    const month = (currentDate.getMonth() + 1).toString().padStart(2, '0');
    const year = currentDate.getFullYear();
    return `${day}.${month}.${year}`;
}

export const getArrDate = () => {
    const datesArray: string[] = [];
    let currentDate = today;
    for (let i = 0; i < 7; i++) {
        let dayOfWeek = arrDaysOfWeek[+currentDate.getDay()];
        if (i === 0 ) dayOfWeek = 'сегодня';
        if (i === 1 ) dayOfWeek = 'завтра';

        const day = currentDate.getDate().toString().padStart(2, '0');
        const month = (currentDate.getMonth() + 1).toString().padStart(2, '0');
        const year = currentDate.getFullYear();
        const dateNumMonth = `${day}.${month}.${year}`;

        datesArray.push(dayOfWeek + ', ' + dateNumMonth);
        currentDate = addDays(currentDate, 1);
    }
    return datesArray;
}

export const addDayOfWeek = (date: string) => {
    let fullDate = getArrDate().find((item) => {
        const itemPart = item.split(', ')[1];
        return itemPart === date;
    });
    if (fullDate) return fullDate;

    fullDate = getArrSoonDatesWithWeek().find((item) => {
        const itemPart = item.split(', ')[1];
        return itemPart === date;
    });
    if (fullDate) return fullDate;
    return 'err';
}

export const formateDateItem = (item: string) => {
    const [dayOfWeek, dateNumber] = item.split(', ');
    const [dayNum, monthIndex, year] = dateNumber.split('.');
    const month = russianMonths[Number(monthIndex) - 1];
    return `${dayOfWeek}, ${+dayNum} ${month}`;
}

export const getArrSelect = (type: string) => {
    switch(type) {
        case 'video': return ['2D', '3D', 'ScreenX', 'IMAX'];
        case 'audio': return ['Dolby Digital', 'Dolby Atmos', 'Harman Kardon'];
        case 'language': return ['Русский язык', 'Беларуская мова', 'English', 'SUB'];
        case 'shortLang': return ['RU', 'BEL', 'ENG', 'SUB'];
        default: return ['ошибка'];
    }
}

export const getAudio = (room: number) => {
    switch(room) {
        case 1: case 2: return 'Dolby Digital';
        case 3: case 4: return 'Dolby Atmos';
        case 5: case 6: return 'Harman Kardon';
        default: return 'ошибка';
    }
}

export const getRoomVideo = (room: number) => {
    switch(room) {
        case 5: return 'screenX';
        case 6: return 'IMAX';
        default: return '';
    }
}

export const getFullLanguage = (shortLang: string) => {
    switch(shortLang) {
        case 'RU': return 'Русский язык';
        case 'BEL': return 'Беларуская мова';
        case 'ENG': return 'English';
        case 'SUB': return 'SUB';
        default: return 'ошибка';
    }
}

export const setDateStore = (searchDate: string, dispatch: any) => {
    const arrDate = getArrDate();
    dispatch({ 
        type: "SET_SEARCH", 
        payload: {
            type: 'date',
            data: searchDate
        }
    });
}

export const getArrDates7Days = () => {
    const formatDate = (date: Date) => {
        const day = date.getDate();
        const month = date.getMonth() + 1;
        const year = date.getFullYear();
        return `${day < 10 ? '0' : ''}${day}.${month < 10 ? '0' : ''}${month}.${year}`;
    }
      const currentDay = today;
      const arr = [formatDate(currentDay)];
    for (let i = 1; i <= 6; i++) {
        const nextDate = new Date(currentDay);
        nextDate.setDate(currentDay.getDate() + i);
        arr.push(formatDate(nextDate));
    }
    return arr;
}

export const getArrMoviesShow = (arrMovies: IMovie[], movieTypeSelect: string) => {
    if (movieTypeSelect === 'already') {
        return arrMovies.filter(movie =>  {
            return movie.schedule.some((item) => getArrDates7Days().includes(item.date));
        });
    } else {
        return arrMovies.filter(movie =>  {
            const bool = movie.schedule.some((item) => getArrDates7Days().includes(item.date));
            return (bool) ? false : true;
        });
    }
}
  
export const getArrSoonDatesWithWeek = () => {
    const formatDate = (date: Date) => {
        const day = date.getDate().toString().padStart(2, '0');
        const month = (date.getMonth() + 1).toString().padStart(2, '0');
        const year = date.getFullYear();
        return `${day}.${month}.${year}`;
    }
    const currentDay = today;
    const dateArray = [];
    for (let i = 0; i < 6; i++) {
        const futureDate = new Date(currentDay);
        futureDate.setDate(currentDay.getDate() + 7 + i);
        const dayOfWeek = arrDaysOfWeek[futureDate.getDay()];
        const formattedDate = formatDate(futureDate);
        dateArray.push(`${dayOfWeek}, ${formattedDate}`);
    }
    return dateArray;
}