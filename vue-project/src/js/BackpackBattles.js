export class PlacementGrid {
    WIDTH = 9;
    HEIGHT = 7;
    slots;

    constructor() {
        this.slots = [];
        this.initializeSlots();
    }

    initializeSlots() {
        for (let x = 1; x <= this.WIDTH; x++) {
            for (let y = 1; y <= this.HEIGHT; y++) {
                this.slots.push(new Slot(new Coordinate(x, y)));
            }
        }
    }
}

// renderable
export class Item {
    // an item has a shape, and also a list of coorinates it overlaps with
    constructor(shape, developerName=null) {
        this.shape = shape;
        this.occupiedCoordinates = []; // should change with clicks and drags
        this.developerName = developerName;
    }
}

// describes the shape of an item with a 2d array
export class Shape {
    constructor(shape) {
        this.shape = shape;
    }

    as2dArray() {
        return this.shape;
    }
}

let twoByOne = new Shape([[1, 1]]);
let dagger = new Item(twoByOne);

// a placement grid is made up of slots
// renderable
export class Slot {
    constructor(coordinate) {
        this.coordinate = coordinate;
        this.item = null;
    }

    setItem(item) {
        this.item = item;
    }
}

export class Coordinate {
    constructor(x, y) {
        this.x = x;
        this.y = y;
    }
}
