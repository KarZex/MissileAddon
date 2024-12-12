import { world, system, EquipmentSlot } from "@minecraft/server"
import { ActionFormData, ModalFormData } from "@minecraft/server-ui"

function tntBlockIgniteEvent( event ){
    const item = event.player.getComponent("equippable").getEquipmentSlot(EquipmentSlot.Mainhand);
	const tnt =  event.block.typeId.replace(`zex:`,`ignite:`)
	const tntLocation = event.block.location;
    if( item.typeId.includes(`flint_and_steel`) ){
		event.block.dimension.spawnEntity(tnt,tntLocation ).teleport({ x:tntLocation.x+0.5, y:tntLocation.y+1, z:tntLocation.z+0.5 });
		event.block.dimension.playSound(`random.fuse`,tntLocation);
		event.block.dimension.setBlockType(tntLocation,`minecraft:air`);
    }
}

function missileLaunchingEvent( event ){
    event.source.runCommand(`event entity @e[family=missile,tag=!flying,c=1,tag=ready] zex:missile_launched`);
}

world.beforeEvents.worldInitialize.subscribe( e => {
    e.blockComponentRegistry.registerCustomComponent(`zex:ignite`,{onPlayerInteract: tntBlockIgniteEvent});
    e.itemComponentRegistry.registerCustomComponent(`zex:launch`,{onUse: missileLaunchingEvent});
} )

world.afterEvents.playerInteractWithEntity.subscribe((Interact) => {
	const missile = Interact.target;
	const player = Interact.player;
	if ( missile.typeId.includes("addon:missile") ){
		const form = new ActionFormData()
		if (  missile.getDynamicProperty(`target`) == undefined ){
			missile.setDynamicProperty(`target`,{ x:missile.location.x, y:320, z:missile.location.z });
		}
		missile.addTag(`ready`);
		form.title("Missile");
		form.button("Target Setting");
		form.button("Launch!");
		form.show(player).then( result => {
			if (!result.canceled) {
				switch (result.selection) {
					case 0:{
						const form = new ModalFormData();
						form.title("Setting Target");
						form.textField(`Setting Target X`,`${missile.getDynamicProperty(`target`).x}`,`${missile.getDynamicProperty(`target`).x}`);
						form.textField(`Setting Target Z`,`${missile.getDynamicProperty(`target`).z}`,`${missile.getDynamicProperty(`target`).z}`);
						form.show(player).then( r => {
							if (!r.canceled) {
								missile.setDynamicProperty(`target`,{ x:Number(r.formValues[0]), y:320, z:Number(r.formValues[1]) });
								missile.addTag(`ready`);
							}
						},)
					}; break;
					case 1:{
						missile.triggerEvent('zex:missile_launched');
					}; break;
				}		
			}
		},)
	}

},)

system.afterEvents.scriptEventReceive.subscribe(event => {
	if (event.id === "zex:missiletp"){
		const missile = event.sourceEntity;
		missile.teleport(missile.getDynamicProperty(`target`));
		missile.triggerEvent('zex:bombing');
	}

},)