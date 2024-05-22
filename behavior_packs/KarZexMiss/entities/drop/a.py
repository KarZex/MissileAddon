import json
for i in range(21):
    file_json = json.load(open("a{}.json".format(i),"r"))
    file_json["minecraft:entity"]["components"]["minecraft:type_family"] = { "family": ["drop"] }
    with open("a{}.json".format(i),"w") as f:
        json.dump(file_json,f,indent=2)
