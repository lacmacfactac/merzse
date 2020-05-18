let waypoints = [];
let c;
let origin = [47.460427, 19.271689];
let range = [47.439981, 19.298232];

class Waypoint {
    constructor(id) {
        this.id = id;
        this.tX;
        this.tY;
        this.parse();
        this.updateElement();
    }

    parse() {

        if (this.id != "gps_marker") {
            let coordinates = this.id.split(',');
            this.tX = map(parseFloat(coordinates[1]), origin[1], range[1], 0, 1);
            this.tY = map(parseFloat(coordinates[0]), origin[0], range[0], 0, 1);
        } else {
            this.tX = .9;
            this.tY = 0;
        }
        print(this.tX, this.tY);

    }

    updateElement() {
        let mapBackground = select('#map_container');
        print(mapBackground);
        let element = select("#" + this.id);
        // print(mapBackground.offsetWidth * this.tX, mapBackground.offsetHeight * this.tY);
        print(mapBackground.width, mapBackground.height);



        element.position(mapBackground.width * this.tX, mapBackground.height * this.tY, "absolute");
    }

}

function setup() {
    let waypointElements = selectAll(".waypoint");

    for (let i = 0; i < waypointElements.length; i++) {
        waypoints[i] = new Waypoint(waypointElements[i].id());
    }
    createCanvas(0, 0);
    frameRate(5);
}

function draw() {
    waypoints.forEach(
        function (element, index) {
            element.updateElement();
        }
    );
}
