import json
file = open("m0.json","r")
file_json = json.load(file)
for i in range(22):
    file_json["minecraft:entity"]["description"]["identifier"] = "addon:missile{}".format(i)
    file_json["minecraft:entity"]["component_groups"]["zex:bombing"]["minecraft:transformation"]["into"] = "drop:a{}".format(i)
    with open("m{}.json".format(i),'w') as f:
        json.dump(file_json,f,indent=2)
