import json
file = open("er.json","r")
file_json = json.load(file)
for i in range(22):
    file_json["minecraft:recipe_shaped"]["description"]["identifier"] = "zex:missile{}_recipe".format(i)
    file_json["minecraft:recipe_shaped"]["key"]["A"]["item"] = "zex:tnt{}".format(i)
    file_json["minecraft:recipe_shaped"]["result"]["item"] = "addon:missile{}_spawn_egg".format(i)
    with open("m{}.json".format(i),'w') as f:
        json.dump(file_json,f,indent=2)
