let teams = {};

export function searchCacheForTeam(id) {
    return teams[id];
}

export function cacheTeam(id, team) {
    teams[id] = team;
    /*console.log("team cached, id:"+id + " team:"+team.name);
    console.log(teams);

    console.log();*/
}





/*function lookupTeamName(teamId) {
    fetch("http://localhost:8080/team/getTeamById?teamId="+teamId)
        .then(res => res.json())
        .then(team => {
            const teamName = team.name;
            teamNames.teamId = teamName;
            console.log("lookupTeamName():"+teamName);
            return teamName;
        });
};

export default function getTeamName(teamId) {
    lookupTeamName(teamId).then((res) => {
        console.log("getTeamName():"+res);
        return res; // teamNames[teamId] ?? lookupTeamName(teamId);
    });
}*/

/*export default new Promise(function(callback) {
    
});*/