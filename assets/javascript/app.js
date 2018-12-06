function renderTrains(list) {
    // add for loop

    var tRow = $("<tr>");
    
    var nameTd = $("<td>").text(list.name);
    var destTd = $("<td>").text(list.dest);
    var freqTd = $("<td>").text(list.freq);
    var nextTd = $("<td>").text(list.next);
    var minTd = $("<td>").text(list.min);
    
    tRow.append(nameTd, destTd, freqTd, nextTd, minTd);
    
    $("tbody").append(tRow);
}

list = {
    name: "train",
    dest: "NYC",
    freq: "30",
    next: "12:30 AM",
    min: "5"
}

renderTrains(list);