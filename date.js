// Date - класс, объекты которого позволяют работать с датой и временем.

class Event {
  constructor(name, date, minutes) {
    this.name = name;
    this.date = date;
    this.minutes = minutes;
  }
}
class Shedule {
  constructor(eventList = []) {
    this.eventList = eventList;
  }
  addEvent(newEvent) {
    for (let i of this.eventList) {
      if (newEvent.date.getTime() == i.date.getTime()) {
        throw new Error("Событие на это время уже есть");
      }
      let time = i.date.getTime() + i.minutes * 60 * 1000;

      let newEventStart = newEvent.date.getTime();
      let newEventEnd = newEvent.date.getTime() + newEvent.minutes * 60 * 1000;
      let iStart = i.date.getTime();
      let iEnd = i.date.getTime() + i.minutes * 60 * 1000;
      if (
        newEvent.date.getFullYear() == i.date.getFullYear() &&
        newEvent.date.getMonth() == i.date.getMonth() &&
        newEvent.date.getDate() == i.date.getDate() &&
        newEventStart < iStart &&
        newEventEnd > iStart
      ) {
        throw new Error("В это время уже есть мероприятие");
      }

      if (
        newEvent.date.getFullYear() == i.date.getFullYear() &&
        newEvent.date.getMonth() == i.date.getMonth() &&
        newEvent.date.getDate() == i.date.getDate() &&
        newEventStart < iEnd &&
        newEventStart > iStart
      ) {
        throw new Error("В это время уже есть мероприятие");
      }
    }
    return this.eventList.push(newEvent);
  }
  printEvent() {
    return this.eventList.sort((a, b) => a.date - b.date);
  }
  findEventsByDate(year, month, day) {
    let evenArr = [];
    for (let key in this.eventList) {
      let date = this.eventList[key].date;
      if (
        year == date.getFullYear() &&
        month == date.getMonth() &&
        day == date.getDate()
      ) {
        evenArr.push(this.eventList[key]);
      }
    }
    if (evenArr.length == 0) {
      return new Error("В этот день нет событий");
    }
    return evenArr;
  }
  longestEvent(year, month, day) {
    let max = 0;
    let arr = [];
    let longest;
    arr.push(this.findEventsByDate(year, month, day));
    for (let el of arr) {
      for (let item of el) {
        if (max < item.minutes) {
          max = item.minutes;
          longest = item;
        }
      }
    }
    return longest;
    // console.log(arr);
  }
  findClosestEventByDate(date) {
    let closestEvent;
    let closestArr = this.findEventsByDate(
      date.getFullYear(),
      date.getMonth(),
      date.getDate()
    );

    let min = null;
    try {
      for (let el of closestArr) {
        // console.log(el.date.getTime() - date.getTime());
        // Если min === null или разница между датами меньше min -> перезаписать min на разницу
        let diff = Math.abs(el.date.getTime() - date.getTime());
        if (!min || min > diff) {
          min = diff;
          closestEvent = el;
        }
        // console.log(min);
      }
      return closestEvent;
    } catch (e) {
      return new Error("В этот день нет события");
    }
  }
  eventsCountByYear(year) {
    let n = 0;
    for (let el of this.eventList) {
      if (year == el.date.getFullYear()) {
        n++;
      }
    }
    return n;
  }
  eventsCountGroupedByYear() {
    let obj = {};
    for (let el of this.eventList) {
      let y = el.date.getFullYear();
      if (obj[y] != undefined) {
        obj[y]++;
      } else {
        obj[y] = 1;
      }
    }
    return obj;
  }
  toString() {
    this.eventList.sort((a, b) => a.date - b.date);
    let obj = {};
    for (let el of this.eventList) {
      let y = el.date.getFullYear();
      if (obj[y] != undefined) {
        obj[y].push(
          `${el.name} (${el.date.getHours()}:${el.date.getMinutes()})`
        );
      } else {
        obj[y] = [`${el.name} (${el.date.getHours()}:${el.date.getMinutes()})`];
      }
    }
    let result = "";
    for (let key in obj) {
      // console.log(key + ':');
      result += key + ":\n";
      for (let item in obj[key]) {
        result += "- " + obj[key][item] + "\n";
      }
    }
    return result;
  }
}
// 11:00    12:00 (param)   15:00

// getTime() -> кол-во милисекунд от 1970.

// date1.getTime() - date2.getTime() -> 3000

// date2.getTime() - date3.getTime() -> 5000

let event1 = new Event("Мероприятие", new Date(2022, 1, 20, 19, 50), 90);
// console.log(event1);

let schedule = new Shedule();
schedule.addEvent(new Event("Праздник", new Date(2022, 1, 23, 19, 50), 90));

schedule.addEvent(new Event("Праздник #1", new Date(2023, 1, 20, 12, 50), 120));

schedule.addEvent(new Event("Праздник", new Date(2022, 3, 22, 22, 50), 90));

schedule.addEvent(new Event("Праздник #2", new Date(2023, 1, 20, 15, 0), 180));

// schedule.addEvent(new Event("Праздник #2", new Date(2023, 1, 20, 13, 50), 130));

// console.log(schedule.eventList)

// console.log(schedule.printEvent());

// let result = schedule.findEventsByDate(2023, 1, 25);
// console.log(result);

// let longestEvent = schedule.longestEvent(2023, 1, 20);
// console.log(longestEvent);

// Найти ближайшее событие на указанный день и время.
// a -> 14:50, b -> 15:50
// findClosest(13:00) -> a
// findClosest(17:00) -> b
// findClosest(15:00) -> a
// findClosest(15:40) -> b

// let closestEvent = schedule.findClosestEventByDate(
//   new Date(2022, 3, 22, 15, 40)
// );
// console.log(closestEvent);

// let count = schedule.eventsCountByYear(2023)
// console.log(count)

// let result = schedule.eventsCountGroupedByYear();
// console.log(result);

console.log(schedule.toString());

// 2023:
// - Event #1 (12:30)
// - Event #2 (14:50)
// 2024:
// - ...
