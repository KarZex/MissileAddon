import json
for i in range(21):
    with open("tnt.json","r") as file:
        file_json = json.load(file)
        file_json["minecraft:block"]["description"]["identifier"] = "zex:tnt{}".format(i)
        file_json["minecraft:block"]["components"]["minecraft:material_instances"]["up"]["texture"] = "tnt{}_top".format(i)
        file_json["minecraft:block"]["components"]["minecraft:material_instances"]["down"]["texture"] = "tnt{}_bottom".format(i)
        file_json["minecraft:block"]["components"]["minecraft:material_instances"]["north"]["texture"] = "tnt{}_side".format(i)
        file_json["minecraft:block"]["components"]["minecraft:material_instances"]["south"]["texture"] = "tnt{}_side".format(i)
        file_json["minecraft:block"]["components"]["minecraft:material_instances"]["east"]["texture"] = "tnt{}_side".format(i)
        file_json["minecraft:block"]["components"]["minecraft:material_instances"]["west"]["texture"] = "tnt{}_side".format(i)
    
    with open("tnt{}.json".format(i),"w") as file:
        json.dump(file_json,file,indent=2)
