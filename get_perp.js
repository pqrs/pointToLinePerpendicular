// Five javascript functions to get the point orthogonal projection of point C onto line AB.

function get_perp1(coords) {

    var line = {
        x1: 36.32097060252262,
        y1: -6.157343175029723,
        x2: 36.30646403836374,
        y2: -6.151123132324187,
    };

    var xx = line.x2 - line.x1;
    var yy = line.y2 - line.y1;

    var shortestLength = ((xx * (coords.lat - line.x1)) + (yy * (coords.lng - line.y1))) / ((xx * xx) + (yy * yy));

    x3 = line.x1 + xx * shortestLength;
    y3 = line.y1 + yy * shortestLength;

    return {lat:x3,lng:y3};
};


function get_perp2(p) {

    var a = { lat: 36.32097060252262, lng: -6.157343175029723 };
    var b = { lat: 36.30646403836374, lng: -6.151123132324187 };

    var c = {lat:0,lng:0};

    // edge cases
    if (a.lat === b.lat) {
        // AB is vertical
        c.lat = a.lat;
        c.lng = p.lng;
    }
    else if (a.lng === b.lng) {
        // AB is horizontal
        c.lat = p.lat;
        c.lng = a.lng;
    }
    else {
    // linear function of AB
        var m1 = (b.lng - a.lng) / (b.lat - a.lat);
        var t1 = a.lng - m1 * a.lat;
        // linear function of PC
        var m2 = -1 / m1; // perpendicular
        var t2 = p.lng - m2 * p.lat;
        // c.lat * m1 + t1 === c.lat * m2 + t2
        c.lat = (t2 - t1) / (m1 - m2);
        c.lng = m1 * c.lat + t1;
    }
    return c;
};

function get_perp3(C){
    var A = { lat: 36.32097060252262, lng: -6.157343175029723 };
    var B = { lat: 36.30646403836374, lng: -6.151123132324187 };

    var x1=A.lat, y1=A.lng, x2=B.lat, y2=B.lng, x3=C.lat, y3=C.lng;
    var px = x2-x1, py = y2-y1, dAB = px*px + py*py;
    var u = ((x3 - x1) * px + (y3 - y1) * py) / dAB;
    var x = x1 + u * px, y = y1 + u * py;

    return {lat:x, lng:y};
}


function get_perp4(C){
    var A = { lat: 36.32097060252262, lng: -6.157343175029723 };
    var B = { lat: 36.30646403836374, lng: -6.151123132324187 };

    t = ((C.lat-A.lat)*(B.lat-A.lat)+(C.lng-A.lng)*(B.lng-A.lng))/((B.lat-A.lat)*(B.lat-A.lat)+(B.lng-A.lng)*(B.lng-A.lng));

    var D = { lat:0,lng:0};
    D.lat = A.lat + t*(B.lat-A.lat);
    D.lng = A.lng + t*(B.lng-A.lng);

    return D;
}

function get_perp5(C){
    var A = { lat: 36.32097060252262, lng: -6.157343175029723 };
    var B = { lat: 36.30646403836374, lng: -6.151123132324187 };

    t1 = C.lat-A.lat;
    t2 = B.lat-A.lat;
    t3 = C.lng-A.lng;
    t4 = B.lng-A.lng;
    t5 = (B.lat-A.lat)*(B.lat-A.lat);
    t6 = (B.lng-A.lng)*(B.lng-A.lng);

    t = (t1*t2+t3*t4)/(t5+t6);

    var D = { lat:0,lng:0};
    D.lat = A.lat + t*t2;
    D.lng = A.lng + t*t4;

    return D;
}
