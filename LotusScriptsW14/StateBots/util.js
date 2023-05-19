function pfToGob(gob = null) {
    if (!gob) {
        PBotUtils.sysMsg(ui, "No object specified to path to.");
        return;
    }
    // wait for player to start moving, then for player to stop
    do {
        if (!PBotGobAPI.player(ui).isMoving()) { //Standing still
            if (!gob.pfClick(1, 0)) {
                PBotUtils.sysMsg(ui, "Cant find a way to path to the object");
            }
            PBotUtils.sleep(300);
        }
        if (PBotGobAPI.player(ui).isMoving()) {
            PBotUtils.sysMsg(ui, "movin' I am waiting 300ms");
            PBotUtils.sleep(300);
        }
    } while (distanceToGob > 11);
    PBotUtils.sysMsg(ui, "PF Done");
}
function distanceToGob(gob) {
    const gobPos = gob.getRcCoords().floor();
    const playerPos = PBotGobAPI.player(ui).getRcCoords().floor();
    const distanceX = gobPos.x - playerPos.x;
    const distanceY = gobPos.y - playerPos.y;
    const total = pythagorean(distanceX, distanceY);
    return total;
}
function pythagorean(sideA, sideB) {
    return Math.sqrt(Math.pow(sideA, 2) + Math.pow(sideB, 2));
}
function getProgressBar(progress) {
    const numDots = Math.floor(progress * 10);
    const progressBar = "[" + ">".repeat(numDots) + "-".repeat(10 - numDots) + "]";
    return progressBar;
}
function irq() {
    let stopbot = false;
    if (PBotCharacterAPI.getStamina(ui) < 35) {
        PBotUtils.sysMsg(ui, "Out of Stamina");
        stopbot = true;
    }
    if (PBotCharacterAPI.getEnergy(ui) < 35) {
        PBotUtils.sysMsg(ui, "Out of Energy");
        stopbot = true;
    }
    return stopbot;
}