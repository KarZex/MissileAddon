import { world, system } from "@minecraft/server"
import { ActionFormData, ModalFormData } from "@minecraft/server-ui"

world.afterEvents.playerInteractWithEntity.subscribe((Interact) => {
	const missile = Interact.target
	const player = Interact.player
	if ( missile.typeId.includes("addon:missile") ){
		let xpos = missile.location.x
		let zpos = missile.location.z
		if (  world.scoreboard.getObjective("targetx").hasParticipant(missile) ){
			xpos = world.scoreboard.getObjective("targetx").getScore(missile)
		}
		else{
			world.scoreboard.getObjective("targetx").setScore(missile, xpos)
		}

		if (  world.scoreboard.getObjective("targetz").hasParticipant(missile) ){
			zpos = world.scoreboard.getObjective("targetz").getScore(missile)
		}
		else{
			world.scoreboard.getObjective("targetz").setScore(missile, zpos)
		}
		const form = new ActionFormData()
		form.title("Missile")
		form.button("Target Setting")
		form.button("Launch!")
		form.show(player).then( result => {
			if (!result.canceled) {
				switch (result.selection) {
					case 0:{
						const form = new ModalFormData()
						form.title("Setting Target")
						form.textField(`Setting Target X`,`${xpos}`,`${xpos}`);
						form.textField(`Setting Target Z`,`${zpos}`,`${zpos}`);
						form.show(player).then( r => {
							if (!r.canceled) {
								world.scoreboard.getObjective("targetx").setScore(missile, Number(r.formValues[0]))
								world.scoreboard.getObjective("targetz").setScore(missile, Number(r.formValues[1]))
							}
						},)
					}; break;
					case 1:{
						missile.triggerEvent('zex:missile_launched')
					}; break;
				}		
			}
		},)
	}

},)

system.afterEvents.scriptEventReceive.subscribe(event => {
	if (event.id === "zex:missiletp"){
		let x = world.scoreboard.getObjective("targetx").getScore(event.sourceEntity)
		let y = event.sourceEntity.location.y
		let z = world.scoreboard.getObjective("targetz").getScore(event.sourceEntity)
		event.sourceEntity.teleport({ x:Number(x), y:Number(y), z:Number(z) })
		event.sourceEntity.triggerEvent('zex:bombing')
	}

},)