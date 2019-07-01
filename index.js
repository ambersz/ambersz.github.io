function onSubmit(e) {
    e.preventDefault();
    var player = {};
    player.power = parseInt(document.getElementById("power").value,10);
    player.precision = parseFloat(document.getElementById("precision").value);
    player.crit = parseFloat(document.getElementById("critpower").value);
    player.proficiency = parseFloat(document.getElementById("proficiency").value);
    var target = {};
    target.hp = parseInt(document.getElementById("hp").value,10);
    util.getAverage(document.getElementById("cycles").value, player, target, displayAverage);

}
function displayAverage(ave) {
    var id;
    if (document.getElementById("compare").checked===true) {
        id="alt";
    } else {
        id = "base";
    }
    document.getElementById(id).value = ave;
}

document.getElementById("submit-button").onclick = onSubmit;
document.getElementById("form").onsubmit = onSubmit;
console.log("yeeah?");

var util = {};
util.getDamage = function(power, precision, crit, proficiency) {
    const base = power * (1+proficiency);
    if (Math.random()<precision) {
        return base*(1+crit);
    }
    return base;
}

util.getAverage = function(cycles, player, target, callback) {
    const times = cycles;
    var sum = 0;
    while (cycles--) {
        sum += util.simulate(player, target);
        console.log(cycles+" left");
    }
    if (typeof callback === "function") {
        callback(sum/times);
    }
}

util.simulate = function(player, target) {
    var currentTargetHP = parseInt(target.hp, 10);
    var rounds = 0;
    console.log(currentTargetHP)
    while (currentTargetHP>0) {
        currentTargetHP -= util.getDamage(player.power, player.precision, player.crit, player.proficiency);
        rounds += 1;
        console.log(currentTargetHP);
    }
    return rounds;
}