import { world, system } from "@minecraft/server"
import { ActionFormData, ModalFormData } from "@minecraft/server-ui"

world.afterEvents.playerInteractWithEntity.subscribe((Interact) => {
	const missile = Interact.target
	const player = Interact.player
	if ( missile.typeId.includes("addon:missile") ){
		missile.addTag(`ready`)
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
						form.textField(`Setting Target X`,`${missile.location.x}`,`${missile.location.x}`);
						form.textField(`Setting Target Z`,`${missile.location.z}`,`${missile.location.z}`);
						form.show(player).then( r => {
							if (!r.canceled) {
								missile.setDynamicProperty(`target`,{ x:Number(r.formValues[0]), y:320, z:Number(r.formValues[1]) })
								missile.addTag(`ready`)
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
		const missile = event.sourceEntity
		missile.teleport(missile.getDynamicProperty(`target`))
		missile.triggerEvent('zex:bombing')
	}

},)