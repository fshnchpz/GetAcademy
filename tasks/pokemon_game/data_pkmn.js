const data_pkmn = [
    {"id":"venusaur","name":"Venusaur","type":["Grass"],"curHP":270, "maxHP":270,"attack":152,"defense":153,"sp_atk":184,"sp_def":184,"speed":148,"moves":["Solar Beam"]},
    {"id":"blastoise","name":"Blastoise","type":["Water"],"curHP":268, "maxHP":268,"attack":153,"defense":184,"sp_atk":157,"sp_def":193,"speed":144,"moves":["Hydro Pump"]},
    {"id":"charizard","name":"Charizard","type":["Fire"],"curHP":266, "maxHP":266,"attack":155,"defense":144,"sp_atk":200,"sp_def":157,"speed":184,"moves":["Fire Blast"]},
    {"id":"Flygon","name":"Flygon","type":["Ground","Dragon"],"curHP":270, "maxHP":270,"attack":184,"defense":148,"sp_atk":148,"sp_def":148,"speed":184,"moves":["Dragon Rush"]},
    {"id":"Rotom-frost","name":"Rotom","type":["Electric","Ice"],"curHP":210, "maxHP":210,"attack":121,"defense":197,"sp_atk":193,"sp_def":197,"speed":159,"moves":["Thunder","Blizzard"]},
    {"id":"Lucario","name":"Lucario","type":["Fighting","Steel"],"curHP":250, "maxHP":250,"attack":202,"defense":130,"sp_atk":211,"sp_def":130,"speed":166,"moves":["Close Combat","Meteor Mash","Aura Sphere","Flash Cannon"]}
];

const data_moves = [
    { "id":"Solar Beam", "Power": 120, "mType":"Grass", "Special":true,"Accuracy":100},
    { "id":"Solar Blade", "Power": 125, "mType":"Grass", "Special":false,"Accuracy":100},
    { "id":"Hydro Pump", "Power": 110, "mType":"Water", "Special":true,"Accuracy":80},
    { "id":"Liquidation", "Power": 85, "mType":"Water", "Special":false,"Accuracy":100},
    { "id":"Fire Blast", "Power": 110, "mType":"Fire", "Special":true,"Accuracy":85},
    { "id":"Flare Blitz", "Power": 120, "mType":"Fire", "Special":false,"Accuracy":100},
    
    { "id":"Thunder", "Power": 110, "mType":"Electric", "Special":true,"Accuracy":70},
    { "id":"Volt Tackle", "Power": 120, "mType":"Electric", "Special":false,"Accuracy":100},

    { "id":"Blizzard", "Power": 110, "mType":"Ice", "Special":true,"Accuracy":70},
    { "id":"Ice Hammer", "Power": 100, "mType":"Ice", "Special":false,"Accuracy":90},
    
    { "id":"Thunder", "Power": 110, "mType":"Electric", "Special":true,"Accuracy":70},
    { "id":"Volt Tackle", "Power": 120, "mType":"Electric", "Special":false,"Accuracy":100},
    
    { "id":"Dragon Pulse", "Power": 85, "mType":"Dragon", "Special":true,"Accuracy":70},
    { "id":"Dragon Rush", "Power": 120, "mType":"Dragon", "Special":false,"Accuracy":75},
    
    { "id":"Psychic", "Power": 90, "mType":"Psychic", "Special":true,"Accuracy":100},
    { "id":"Psychic Fangs", "Power": 85, "mType":"Psychic", "Special":false,"Accuracy":100},

    { "id":"Meteor Mash", "Power": 90, "mType":"Steel", "Special":false,"Accuracy":90},
    { "id":"Flash Cannon", "Power": 80, "mType":"Steel", "Special":true,"Accuracy":100},
    { "id":"Close Combat", "Power": 120, "mType":"Fighting", "Special":false,"Accuracy":100},
    { "id":"Aura Sphere", "Power": 80, "mType":"Fighting", "Special":true,"Accuracy":100}
];