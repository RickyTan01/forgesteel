import { AbilityDistanceType } from '@/enums/ability-distance-type';
import { AbilityKeyword } from '@/enums/ability-keyword';
import { Characteristic } from '@/enums/characteristic';
import { FactoryLogic } from '@/logic/factory-logic';
import { FeatureField } from '@/enums/feature-field';
import { HeroClass } from '@/models/class';
import { PerkList } from '@/enums/perk-list';
import { SkillList } from '@/enums/skill-list';
import { Sourcebook } from '@/models/sourcebook';
import { SourcebookType } from '@/enums/sourcebook-type';

const thaumaturge: HeroClass = {
	id: 'class-thaumaturge',
	name: 'Thaumaturge',
	description: `
Where the Elementalist channels a substance - fire, earth, void - the Thaumaturge is defined by how and why they channel: the learned, academic magic of Vara's institutions, organised not by what it's made of but by what it's for. A Thaumaturge is a graduate of the Magisterium or the Cavendish Institute, a Sanctioner of the Dashin Hagwan, a fire-scholar of the Collegium - a person who has studied magic as a discipline and can bend it to a purpose.

Their power is broad, precise, and a little dangerous, because the surest way to cast more than you've prepared is to reach through the thinning Veil and pull - and the Veil does not always give you only what you asked for.`,
	type: 'standard',
	subclassName: 'School',
	subclassCount: 1,
	primaryCharacteristicsOptions: [
		[ Characteristic.Reason ]
	],
	primaryCharacteristics: [ Characteristic.Reason ],
	featuresByLevel: [
		{
			level: 1,
			features: [
				FactoryLogic.feature.createBonus({
					id: 'thaumaturge-stamina',
					field: FeatureField.Stamina,
					value: 18,
					valuePerLevel: 6
				}),
				FactoryLogic.feature.createBonus({
					id: 'thaumaturge-recoveries',
					field: FeatureField.Recoveries,
					value: 8
				}),
				FactoryLogic.feature.createHeroicResource({
					id: 'thaumaturge-resource',
					name: 'Essence',
					gains: [
						{
							tag: 'start',
							trigger: 'Start of your turn',
							value: '2'
						},
						{
							tag: 'damage-condition',
							trigger: 'The first time each combat round that one of your magic abilities damages an enemy or imposes a condition on one',
							value: '1'
						},
						{
							tag: 'tier3',
							trigger: 'You score a tier-3 result with an ability with the Magic keyword',
							value: '1'
						}
					],
					details: `
**Overchannel.** When the prepared reserve isn't enough, a Thaumaturge reaches through the Veil for more. When you use an ability that costs Essence, you may pay part of the cost with Essence you don't have - drawing the difference straight through the Veil. Resolve the ability as though you'd paid in full. Your Essence becomes negative (to a deficit no greater than your Reason score), and before you resolve the ability you're paying for, roll on the Overchannel table.

While your Essence is negative you can't Overchannel; you climb back to positive through your normal gains.

| d10 | Effect                                                                                                                                                                                        |
|:====|:==============================================================================================================================================================================================|
| 1   | Flux. Roll again; if you get another 1, there is no effect.                                                                                                                                   |
| 2   | Burnout. Your Essence drops to -2 x your Reason.                                                                                                                                              |
| 3   | Backlash. You take damage equal to twice your Reason times your Essence debt; it can't be reduced.                                                                                            |
| 4   | Spillover. Each creature within a number of squares equal to your Essence debt (allies included) takes damage equal to twice your Reason (cold, fire, lightning, or sonic; your choice).      |
| 5   | Feedback. You are dazed until the end of your next turn.                                                                                                                                      |
| 6   | Interference. You are weakened (save ends).                                                                                                                                                   |
| 7   | Influx. A 1 cube within 5 squares becomes magic-thick difficult terrain until the end of the round; the first creature to enter it takes damage equal to your Reason times your Essence debt. |
| 8   | Flicker. You teleport to a random unoccupied square within 5.                                                                                                                                 |
| 9   | Surge. One creature the ability affected takes extra damage equal to twice your Reason; if it imposed a condition, that condition's potency was 1 higher.                                     |
| 10  | The Veil opens. Your Essence becomes 0 and you gain 1 surge, but the Director gains Malice equal to your Essence debt.                                                                        |
`,
					canBeNegative: true
				}),
				FactoryLogic.feature.createSkillChoice({
					id: 'thaumaturge-skill-magic',
					selected: [ 'Magic' ],
					count: 1
				}),
				FactoryLogic.feature.createSkillChoice({
					id: 'thaumaturge-skill-lore-crafting',
					listOptions: [ SkillList.Lore, SkillList.Crafting ],
					count: 3
				}),
				FactoryLogic.feature.createChoice({
					id: 'thaumaturge-arcane-mantle',
					name: 'Arcane Mantle',
					description: 'A self-woven enchantment. Choose one; you can change your selection during a respite.',
					selectAt: 'respite',
					options: [
						{
							feature: FactoryLogic.feature.create({
								id: 'thaumaturge-mantle-scholar',
								name: 'Mantle of the Scholar',
								description: 'You can wear light armour and wield a light weapon without a kit. While you wield a light weapon you gain +1 damage with weapon abilities.'
							}),
							value: 1
						},
						{
							feature: FactoryLogic.feature.create({
								id: 'thaumaturge-mantle-reach',
								name: 'Mantle of Reach',
								description: 'The distance of your magic abilities increases by 2.'
							}),
							value: 1
						},
						{
							feature: FactoryLogic.feature.create({
								id: 'thaumaturge-mantle-quick',
								name: 'Mantle of the Quick',
								description: 'You gain +1 Speed and +1 Disengage.'
							}),
							value: 1
						}
					]
				}),
				FactoryLogic.feature.createChoice({
					id: 'thaumaturge-ward',
					name: 'Thaumaturge Ward',
					description: 'An invisible defensive working. Choose one; you can change your selection during a respite.',
					selectAt: 'respite',
					options: [
						{
							feature: FactoryLogic.feature.create({
								id: 'thaumaturge-ward-mirror',
								name: 'Mirror Ward',
								description: 'The first time each round you take damage from a creature, that creature takes damage equal to your Reason.'
							}),
							value: 1
						},
						{
							feature: FactoryLogic.feature.createBonus({
								id: 'thaumaturge-ward-glyph',
								name: 'Glyph Ward',
								description: 'You gain a +1 bonus to saving throws.',
								field: FeatureField.Save,
								value: 1
							}),
							value: 1
						},
						{
							feature: FactoryLogic.feature.create({
								id: 'thaumaturge-ward-blink',
								name: 'Blink Ward',
								description: 'The first time each round you take damage, you can teleport up to a number of squares equal to your Reason.'
							}),
							value: 1
						},
						{
							feature: FactoryLogic.feature.create({
								id: 'thaumaturge-ward-veil',
								name: 'Veil Ward',
								description: 'The first time each round you take damage, you gain 1 surge.'
							}),
							value: 1
						}
					]
				}),
				FactoryLogic.feature.create({
					id: 'thaumaturge-veilsight',
					name: 'Veilsight',
					description: `You see what others can't: magic auras, the residue of recent casting, and the thin places where the Veil frays.

When you encounter a magic item or phenomenon, you can read its aura: if you make a Reason (Magic) test you learn its keywords.

Once per round, when a creature within 10 squares uses an ability with the Magic keyword, you can use a triggered action to read the threads of magic: you gain an edge on your next power roll against that creature.`
				}),
				FactoryLogic.feature.createAbility({
					ability: FactoryLogic.createAbility({
						id: 'thaumaturge-divination',
						name: 'Divination',
						description: 'There is no shadow you haven\'t already looked behind.',
						type: FactoryLogic.type.createMain(),
						keywords: [ AbilityKeyword.Area, AbilityKeyword.Magic ],
						distance: [ FactoryLogic.distance.create({ type: AbilityDistanceType.Burst, value: 5 }) ],
						target: 'Special',
						sections: [
							FactoryLogic.createAbilitySectionText('You reveal each hidden or concealed creature.'),
							FactoryLogic.createAbilitySectionSpend({
								value: 1,
								effect: 'You learn one immunity or weakness of each creature you sense.'
							})
						]
					})
				}),
				FactoryLogic.feature.createClassAbilityChoice({
					id: 'thaumaturge-1-ability-3',
					cost: 3,
					count: 1
				}),
				FactoryLogic.feature.createClassAbilityChoice({
					id: 'thaumaturge-1-ability-5',
					cost: 5,
					count: 1
				})
			]
		},
		{
			level: 2,
			features: [
				FactoryLogic.feature.create({
					id: 'thaumaturge-versatile-caster',
					name: 'Versatile Caster',
					description: 'Once per encounter, as a main action, you can swap out one known heroic ability for another.'
				}),
				FactoryLogic.feature.createPerk({
					id: 'thaumaturge-2-perk',
					lists: [ PerkList.Crafting, PerkList.Lore, PerkList.Supernatural ]
				})
			]
		},
		{
			level: 3,
			features: [
				FactoryLogic.feature.createClassAbilityChoice({
					id: 'thaumaturge-3-ability-7',
					cost: 7,
					count: 1
				})
			]
		},
		{
			level: 4,
			features: [
				FactoryLogic.feature.createHeroicResourceGain({
					id: 'thaumaturge-font-of-essence-1',
					name: 'Font of Essence',
					tag: 'damage-condition',
					trigger: 'The first time each combat round that one of your magic abilities damages an enemy or imposes a condition on one',
					value: '2',
					replacesTags: [ 'damage-condition' ]
				}),
				FactoryLogic.feature.createHeroicResourceGain({
					id: 'thaumaturge-font-of-essence-2',
					name: 'Font of Essence',
					tag: 'tier3',
					trigger: 'You score a tier-3 result with an ability with the Magic keyword',
					value: '2',
					replacesTags: [ 'tier3' ]
				}),
				FactoryLogic.feature.createCharacteristicBonus({
					id: 'thaumaturge-4-reason',
					characteristic: Characteristic.Reason,
					value: 1
				}),
				FactoryLogic.feature.createChoice({
					id: 'thaumaturge-4-characteristic',
					name: 'Characteristic Increase',
					description: '+1 to any one characteristic other than Reason.',
					options: [
						{ feature: FactoryLogic.feature.createCharacteristicBonus({ id: 'thaumaturge-4-might', characteristic: Characteristic.Might, value: 1 }), value: 1 },
						{ feature: FactoryLogic.feature.createCharacteristicBonus({ id: 'thaumaturge-4-agility', characteristic: Characteristic.Agility, value: 1 }), value: 1 },
						{ feature: FactoryLogic.feature.createCharacteristicBonus({ id: 'thaumaturge-4-intuition', characteristic: Characteristic.Intuition, value: 1 }), value: 1 },
						{ feature: FactoryLogic.feature.createCharacteristicBonus({ id: 'thaumaturge-4-presence', characteristic: Characteristic.Presence, value: 1 }), value: 1 }
					]
				}),
				FactoryLogic.feature.createSkillChoice({
					id: 'thaumaturge-4-skill',
					count: 1
				}),
				FactoryLogic.feature.createPerk({
					id: 'thaumaturge-4-perk',
					count: 1
				})
			]
		},
		{
			level: 5,
			features: [
				FactoryLogic.feature.createClassAbilityChoice({
					id: 'thaumaturge-5-ability-9',
					cost: 9,
					count: 1
				})
			]
		},
		{
			level: 6,
			features: [
				FactoryLogic.feature.create({
					id: 'thaumaturge-greater-overchannel',
					name: 'Greater Overchannel',
					description: 'Your reach through the Veil deepens: your Overchannel deficit can now run as deep as your Reason score + 2, and once per encounter you may Overchannel without rolling on the Overchannel table - a single, perfectly controlled draw.'
				}),
				FactoryLogic.feature.createPerk({
					id: 'thaumaturge-6-perk',
					lists: [ PerkList.Crafting, PerkList.Lore, PerkList.Supernatural ]
				})
			]
		},
		{
			level: 7,
			features: [
				FactoryLogic.feature.createHeroicResourceGain({
					id: 'thaumaturge-improved-essence',
					name: 'Improved Essence',
					tag: 'start',
					trigger: 'Start of your turn',
					value: '3',
					replacesTags: [ 'start' ]
				}),
				FactoryLogic.feature.createCharacteristicBonus({ id: 'thaumaturge-7-might', characteristic: Characteristic.Might, value: 1 }),
				FactoryLogic.feature.createCharacteristicBonus({ id: 'thaumaturge-7-agility', characteristic: Characteristic.Agility, value: 1 }),
				FactoryLogic.feature.createCharacteristicBonus({ id: 'thaumaturge-7-reason', characteristic: Characteristic.Reason, value: 1 }),
				FactoryLogic.feature.createCharacteristicBonus({ id: 'thaumaturge-7-intuition', characteristic: Characteristic.Intuition, value: 1 }),
				FactoryLogic.feature.createCharacteristicBonus({ id: 'thaumaturge-7-presence', characteristic: Characteristic.Presence, value: 1 }),
				FactoryLogic.feature.createSkillChoice({
					id: 'thaumaturge-7-skill',
					count: 1
				})
			]
		},
		{
			level: 8,
			features: [
				FactoryLogic.feature.createPerk({
					id: 'thaumaturge-8-perk',
					count: 1
				}),
				FactoryLogic.feature.createClassAbilityChoice({
					id: 'thaumaturge-8-ability-11',
					cost: 11,
					count: 1
				})
			]
		},
		{
			level: 9,
			features: [
				FactoryLogic.feature.create({
					id: 'thaumaturge-unfettered-casting',
					name: 'Unfettered Casting',
					description: 'Once per encounter, you can use an ability of 9 Essence or less without paying its cost. The working simply comes, drawn through a Veil that, this deep into your study, barely resists you anymore.'
				})
			]
		},
		{
			level: 10,
			features: [
				FactoryLogic.feature.create({
					id: 'thaumaturge-master-of-the-veil',
					name: 'Master of the Veil',
					description: 'When you Overchannel, your Essence deficit has no limit - you have mastered the draw that destroys lesser casters.'
				}),
				FactoryLogic.feature.createHeroicResource({
					id: 'thaumaturge-epic-resource',
					name: 'Aegis',
					type: 'epic',
					gains: [
						{
							tag: 'respite',
							trigger: 'Each time you finish a respite',
							value: 'the XP you earned'
						}
					],
					details: 'You can spend Aegis as though it were Essence, and you can spend Aegis to use any heroic ability as a free maneuver if you pay that spell\'s whole cost in Aegis.'
				}),
				FactoryLogic.feature.createCharacteristicBonus({ id: 'thaumaturge-10-might', characteristic: Characteristic.Might, value: 1 }),
				FactoryLogic.feature.createCharacteristicBonus({ id: 'thaumaturge-10-agility', characteristic: Characteristic.Agility, value: 1 }),
				FactoryLogic.feature.createCharacteristicBonus({ id: 'thaumaturge-10-reason', characteristic: Characteristic.Reason, value: 1 }),
				FactoryLogic.feature.createCharacteristicBonus({ id: 'thaumaturge-10-intuition', characteristic: Characteristic.Intuition, value: 1 }),
				FactoryLogic.feature.createCharacteristicBonus({ id: 'thaumaturge-10-presence', characteristic: Characteristic.Presence, value: 1 }),
				FactoryLogic.feature.createHeroicResourceGain({
					id: 'thaumaturge-surging-essence',
					name: 'Surging Essence',
					tag: 'start',
					trigger: 'Start of your turn',
					value: '4',
					replacesTags: [ 'start' ]
				})
			]
		}
	],
	abilities: [
		FactoryLogic.createAbility({
			id: 'thaumaturge-arcane-bolt',
			name: 'Arcane Bolt',
			description: 'A bolt of raw, shaped magic.',
			type: FactoryLogic.type.createMain({ freeStrike: true }),
			cost: 'signature',
			keywords: [ AbilityKeyword.Magic, AbilityKeyword.Ranged, AbilityKeyword.Strike ],
			distance: [ FactoryLogic.distance.createRanged(10) ],
			target: 'One creature',
			sections: [
				FactoryLogic.createAbilitySectionRoll(FactoryLogic.createPowerRoll({
					characteristic: Characteristic.Reason,
					tier1: '2 + R damage',
					tier2: '5 + R damage',
					tier3: '7 + R damage'
				})),
				FactoryLogic.createAbilitySectionText('Choose an energy type (acid, cold, fire, lightning, poison, or sonic); the ability deals that type. Usable as a ranged free strike.'),
				FactoryLogic.createAbilitySectionPackage('arcane-bolt')
			]
		}),
		FactoryLogic.createAbility({
			id: 'thaum-arcane-barrage',
			name: 'Arcane Barrage',
			description: 'An initiate’s first area working: pick a flavour, fill a space.',
			type: FactoryLogic.type.createMain(),
			keywords: [ AbilityKeyword.Area, AbilityKeyword.Magic, AbilityKeyword.Strike ],
			distance: [ FactoryLogic.distance.create({ type: AbilityDistanceType.Cube, value: 3, within: 10 }) ],
			target: 'Each creature in the area',
			cost: 3,
			sections: [
				FactoryLogic.createAbilitySectionRoll(FactoryLogic.createPowerRoll({
					characteristic: Characteristic.Reason,
					tier1: '3 + R damage',
					tier2: '5 + R damage',
					tier3: '8 + R damage'
				})),
				FactoryLogic.createAbilitySectionText('This ability can deal your choice of cold, fire, lightning, or sonic damage.'),
				FactoryLogic.createAbilitySectionSpend({
					value: 1,
					effect: 'Enlarge the cube by 1.'
				})
			]
		}),
		FactoryLogic.createAbility({
			id: 'thaum-force-dart',
			name: 'Force Dart',
			description: 'A small, exact unkindness, repeated as often as you please.',
			type: FactoryLogic.type.createMain({ freeStrike: true }),
			keywords: [ AbilityKeyword.Magic, AbilityKeyword.Ranged, AbilityKeyword.Strike ],
			distance: [ FactoryLogic.distance.createRanged(10) ],
			target: 'One enemy',
			cost: 3,
			sections: [
				FactoryLogic.createAbilitySectionRoll(FactoryLogic.createPowerRoll({
					characteristic: Characteristic.Reason,
					tier1: '3 + R damage',
					tier2: '6 + R damage',
					tier3: '8 + R damage; slide 1'
				})),
				FactoryLogic.createAbilitySectionText('This ability deals double damage to objects. Spend 1+: You deal additional damage equal to your Reason for each point you spend.')
			]
		}),
		FactoryLogic.createAbility({
			id: 'thaum-shatterforce',
			name: 'Shatterforce',
			description: 'Force, with the manners filed off.',
			type: FactoryLogic.type.createMain(),
			keywords: [ AbilityKeyword.Magic, AbilityKeyword.Ranged, AbilityKeyword.Strike ],
			distance: [ FactoryLogic.distance.createRanged(10) ],
			target: 'One creature',
			cost: 5,
			sections: [
				FactoryLogic.createAbilitySectionRoll(FactoryLogic.createPowerRoll({
					characteristic: Characteristic.Reason,
					tier1: '7 + R damage',
					tier2: '11 + R damage; push 2',
					tier3: '15 + R damage; push 3 and prone'
				}))
			]
		}),
		FactoryLogic.createAbility({
			id: 'thaum-levinbolt',
			name: 'Levinbolt',
			description: 'Straight there. Electricity has never once taken the scenic route.',
			type: FactoryLogic.type.createMain(),
			keywords: [ AbilityKeyword.Area, AbilityKeyword.Magic, AbilityKeyword.Strike ],
			distance: [ FactoryLogic.distance.create({ type: AbilityDistanceType.Line, value: 10, value2: 1 }) ],
			target: 'Each creature in the area',
			cost: 5,
			sections: [
				FactoryLogic.createAbilitySectionRoll(FactoryLogic.createPowerRoll({
					characteristic: Characteristic.Reason,
					tier1: '6 + R lightning damage',
					tier2: '9 + R lightning damage',
					tier3: '12 + R lightning damage'
				}))
			]
		}),
		FactoryLogic.createAbility({
			id: 'thaum-arc',
			name: 'Arc',
			description: 'It does not stop at one, and rarely stops where you would like it to.',
			type: FactoryLogic.type.createMain(),
			keywords: [ AbilityKeyword.Magic, AbilityKeyword.Ranged, AbilityKeyword.Strike ],
			distance: [ FactoryLogic.distance.createRanged(10) ],
			target: 'One creature',
			cost: 7,
			sections: [
				FactoryLogic.createAbilitySectionRoll(FactoryLogic.createPowerRoll({
					characteristic: Characteristic.Reason,
					tier1: '6 + R lightning damage',
					tier2: '10 + R lightning damage; repeat this ability, targeting a different creature within 1 of the target',
					tier3: '14 + R lightning damage; repeat this ability, targeting a different creature within 3 of the target'
				})),
				FactoryLogic.createAbilitySectionText('This ability keeps jumping between targets until a tier 1 result is reached. It can’t jump back to a target it has already hit.')
			]
		}),
		FactoryLogic.createAbility({
			id: 'thaum-dissolution',
			name: 'Dissolution',
			description: 'What this unmakes does not return.',
			type: FactoryLogic.type.createMain(),
			keywords: [ AbilityKeyword.Magic, AbilityKeyword.Ranged, AbilityKeyword.Strike ],
			distance: [ FactoryLogic.distance.createRanged(10) ],
			target: 'One creature',
			cost: 7,
			sections: [
				FactoryLogic.createAbilitySectionRoll(FactoryLogic.createPowerRoll({
					characteristic: Characteristic.Reason,
					tier1: '10 + R corruption damage',
					tier2: '14 + R corruption damage',
					tier3: '18 + R corruption damage'
				})),
				FactoryLogic.createAbilitySectionText('A creature killed by this spell is destroyed and cannot be restored to life by anything short of an artifact.')
			]
		}),
		FactoryLogic.createAbility({
			id: 'thaum-devastation',
			name: 'Devastation',
			description: 'The point where a working stops being a tool and becomes weather.',
			type: FactoryLogic.type.createMain(),
			keywords: [ AbilityKeyword.Area, AbilityKeyword.Magic, AbilityKeyword.Strike ],
			distance: [ FactoryLogic.distance.create({ type: AbilityDistanceType.Burst, value: 5, within: 10 }) ],
			target: 'Each creature in the area',
			cost: 9,
			sections: [
				FactoryLogic.createAbilitySectionRoll(FactoryLogic.createPowerRoll({
					characteristic: Characteristic.Reason,
					tier1: '10 + R damage',
					tier2: '15 + R damage; prone',
					tier3: '20 + R damage; prone; slowed (save ends)'
				}))
			]
		}),
		FactoryLogic.createAbility({
			id: 'thaum-collapsing-sphere',
			name: 'Collapsing Sphere',
			description: 'A pocket of space folds shut, and disagrees with anything still inside it.',
			type: FactoryLogic.type.createMain(),
			keywords: [ AbilityKeyword.Area, AbilityKeyword.Magic, AbilityKeyword.Strike ],
			distance: [ FactoryLogic.distance.create({ type: AbilityDistanceType.Cube, value: 3, within: 10 }) ],
			target: 'Each creature in the area',
			cost: 9,
			sections: [
				FactoryLogic.createAbilitySectionRoll(FactoryLogic.createPowerRoll({
					characteristic: Characteristic.Reason,
					tier1: '5 + R damage; M<w restrained (save ends)',
					tier2: '8 + R damage; M<v restrained (save ends)',
					tier3: '11 + R damage; M<s restrained (save ends)'
				})),
				FactoryLogic.createAbilitySectionText('Until the start of your next turn the area is difficult terrain, and a restrained creature takes R damage at the start of its turn as the sphere tightens.'),
				FactoryLogic.createAbilitySectionSpend({
					value: 1,
					effect: 'The sphere also pulls each creature in the area 2 squares toward its centre.'
				})
			]
		}),
		FactoryLogic.createAbility({
			id: 'thaum-starfall',
			name: 'Starfall',
			description: 'You call down the ceiling of the world, in pieces, by appointment.',
			type: FactoryLogic.type.createMain(),
			keywords: [ AbilityKeyword.Area, AbilityKeyword.Magic, AbilityKeyword.Strike ],
			distance: [ FactoryLogic.distance.createSpecial('Three 3 bursts, each within 10') ],
			target: 'Each creature in the area',
			cost: 11,
			sections: [
				FactoryLogic.createAbilitySectionRoll(FactoryLogic.createPowerRoll({
					characteristic: Characteristic.Reason,
					tier1: '12 fire damage',
					tier2: '16 fire damage; prone',
					tier3: '20 fire damage; prone'
				})),
				FactoryLogic.createAbilitySectionText('A creature in more than one burst is affected only once. Each burst\'s area burns until the start of your next turn: a creature that enters the area or starts its turn there takes R fire damage.')
			]
		}),
		FactoryLogic.createAbility({
			id: 'thaum-unmake',
			name: 'Unmake',
			description: 'The working with no lesser version: there is what it touches, and then what used to be there.',
			type: FactoryLogic.type.createMain(),
			keywords: [ AbilityKeyword.Magic, AbilityKeyword.Ranged, AbilityKeyword.Strike ],
			distance: [ FactoryLogic.distance.createRanged(10) ],
			target: 'One creature',
			cost: 11,
			sections: [
				FactoryLogic.createAbilitySectionText('The target makes a Might test:'),
				FactoryLogic.createAbilitySectionText('11 or lower: A leader, elite, or solo takes 20 damage and is dazed (save ends). Any other creature is destroyed and removed from the encounter  12-16: 15 damage; dazed (EoT)  17+: 10 damage')
			]
		})
	],
	subclasses: [
		{
			id: 'thaumaturge-school-cavendish',
			name: 'The Cavendish Institute',
			description: 'The Augur fights a battle they\'ve already watched. The Cavendish Institute, in Serne, trains them to read the threads of what-will-be. An Augur knows where the blade falls and whose nerve breaks, and spends that knowledge like coin.',
			featuresByLevel: [
				{
					level: 1,
					features: [
						FactoryLogic.feature.createPackageContent({
							id: 'cavendish-arcane-bolt',
							name: 'Inevitable Bolt',
							description: 'Your Arcane Bolt ignores cover and concealment, and can target a creature you can\'t see whose location you know.',
							tag: 'arcane-bolt'
						}),
						FactoryLogic.feature.createSkillChoice({ id: 'cavendish-skill', selected: [ 'Read Person' ], count: 1 }),
						FactoryLogic.feature.create({
							id: 'cavendish-auguries',
							name: 'Auguries',
							description: 'You have a pool of Auguries equal to your Reason, which refreshes at the start of each encounter. As a free triggered action, you can spend one Augury to add an edge or a bane to a power roll made by a creature within 10.'
						}),
						FactoryLogic.feature.createAbility({
							ability: FactoryLogic.createAbility({
								id: 'cavendish-signature',
								name: 'Hex of Misfortune',
								description: 'Misfortune is only foresight pointed the wrong way.',
								type: FactoryLogic.type.createMain(),
								cost: 'signature',
								keywords: [ AbilityKeyword.Magic, AbilityKeyword.Ranged ],
								distance: [ FactoryLogic.distance.createRanged(10) ],
								target: 'One creature',
								sections: [
									FactoryLogic.createAbilitySectionText('The target takes a bane on its next power roll.'),
									FactoryLogic.createAbilitySectionSpend({
										value: 1,
										effect: 'The target takes a bane on all power rolls (save ends).'
									})
								]
							})
						}),
						FactoryLogic.feature.createAbility({
							ability: FactoryLogic.createAbility({
								id: 'cavendish-forewarning',
								name: 'Forewarning',
								description: 'You saw the blow a heartbeat early - and told them where not to be standing.',
								type: FactoryLogic.type.createTrigger('An ally within 10 squares is targeted by a strike'),
								keywords: [ AbilityKeyword.Magic, AbilityKeyword.Ranged ],
								distance: [ FactoryLogic.distance.createRanged(10) ],
								target: 'One ally',
								sections: [
									FactoryLogic.createAbilitySectionText('Before the strike\'s power roll is made, the target shifts 1 square. If this shift carries them out of the strike\'s distance or area, the strike fails.')
								]
							})
						})
					]
				},
				{ level: 2, features: [ FactoryLogic.feature.createClassAbilityChoice({ id: 'cavendish-2-ability-3', cost: 3, fromSubclass: true, count: 1 }) ] },
				{ level: 5, features: [
					FactoryLogic.feature.create({
						id: 'cavendish-precognition',
						name: 'Precognition',
						description: 'Once each round, when an enemy makes a strike against you or an ally within 10, you can spend an Augury to reduce the result of the power roll by one tier.'
					})
				] },
				{ level: 6, features: [ FactoryLogic.feature.createClassAbilityChoice({ id: 'cavendish-6-ability-7', cost: 7, fromSubclass: true, count: 1 }) ] },
				{ level: 7, features: [
					FactoryLogic.feature.create({
						id: 'cavendish-read-the-auguries',
						name: 'Read the Auguries',
						description: 'When you Overchannel, you can spend an Augury to roll on the Overchannel Table twice and choose which result applies.'
					})
				] },
				{ level: 8, features: [
					FactoryLogic.feature.create({
						id: 'cavendish-i-have-seen-how-this-ends',
						name: 'I Have Seen How This Ends',
						description: 'Once per encounter, before a power roll is made (by you, an ally, or the Director), you can declare that the roll is made with either a double edge or a double bane (your choice).'
					})
				] },
				{ level: 9, features: [ FactoryLogic.feature.createClassAbilityChoice({ id: 'cavendish-9-ability-9', cost: 9, fromSubclass: true, count: 1 }) ] }
			],
			abilities: [
				FactoryLogic.createAbility({
					id: 'cavendish-jinx',
					name: 'Jinx',
					description: 'Every Augur learns the small unmakings first: a stumble, a slipped grip, a sword a finger\'s width wide.',
					type: FactoryLogic.type.createManeuver(),
					keywords: [ AbilityKeyword.Magic, AbilityKeyword.Ranged ],
					distance: [ FactoryLogic.distance.createRanged(10) ],
					target: 'One enemy',
					cost: 3,
					sections: [
						FactoryLogic.createAbilitySectionText('The target takes a bane on its next power roll.'),
						FactoryLogic.createAbilitySectionSpend({
							value: 2,
							effect: 'The target also can\'t achieve a tier 3 result on that roll.'
						})
					]
				}),
				FactoryLogic.createAbility({
					id: 'cavendish-lend-foresight',
					name: 'Lend Foresight',
					description: 'You see the whole exchange a breath before it happens.',
					type: FactoryLogic.type.createManeuver(),
					keywords: [ AbilityKeyword.Magic, AbilityKeyword.Ranged ],
					distance: [ FactoryLogic.distance.createRanged(10) ],
					target: 'One ally',
					cost: 3,
					sections: [
						FactoryLogic.createAbilitySectionText('Until the start of your next turn, the target has an edge on all power rolls and can\'t be surprised. The first time they would roll a tier 1 outcome during this time, they reroll and use the new result.')
					]
				}),
				FactoryLogic.createAbility({
					id: 'cavendish-foreseen-demise',
					name: 'Foreseen Demise',
					description: 'You have read the last page. Now you simply wait for the book to reach it.',
					type: FactoryLogic.type.createMain(),
					keywords: [ AbilityKeyword.Magic, AbilityKeyword.Ranged ],
					distance: [ FactoryLogic.distance.createRanged(10) ],
					target: 'One creature',
					cost: 5,
					sections: [
						FactoryLogic.createAbilitySectionText('You mark the target (save ends). While it is marked, you and your allies deal extra damage equal to your Reason against it, and at the start of the target\'s turn you learn what action it intends to take that turn.')
					]
				}),
				FactoryLogic.createAbility({
					id: 'cavendish-premonition',
					name: 'Premonition',
					description: 'You hand them a page from a book that is yet to be written.',
					type: FactoryLogic.type.createMain(),
					keywords: [ AbilityKeyword.Area, AbilityKeyword.Magic ],
					distance: [ FactoryLogic.distance.create({ type: AbilityDistanceType.Burst, value: 5 }) ],
					target: 'Each ally in the area',
					cost: 5,
					sections: [
						FactoryLogic.createAbilitySectionText('Until the start of your next turn, each affected ally gains an edge on their next power roll, and the first time each is targeted by a strike they may shift 1 as a free triggered action.'),
						FactoryLogic.createAbilitySectionSpend({
							value: 1,
							effect: 'Grant each ally 1 Augury, which lasts until the end of the encounter.'
						})
					]
				}),
				FactoryLogic.createAbility({
					id: 'cavendish-rewrite-the-moment',
					name: 'Rewrite the Moment',
					description: 'Your mind, full of quantum certainty, sees multiple futures and insists upon the path that history takes.',
					type: FactoryLogic.type.createTrigger('An enemy within 10 squares makes a power roll'),
					keywords: [ AbilityKeyword.Magic, AbilityKeyword.Ranged ],
					distance: [ FactoryLogic.distance.createRanged(10) ],
					target: 'One creature',
					cost: 7,
					sections: [
						FactoryLogic.createAbilitySectionText('The triggering creature rerolls the power roll; you choose which result to use.')
					]
				}),
				FactoryLogic.createAbility({
					id: 'cavendish-sever-the-thread',
					name: 'Sever the Thread',
					description: 'Snip. The thread that would have been its next clever move - gone.',
					type: FactoryLogic.type.createMain(),
					keywords: [ AbilityKeyword.Magic, AbilityKeyword.Ranged ],
					distance: [ FactoryLogic.distance.createRanged(10) ],
					target: 'One creature',
					cost: 7,
					sections: [
						FactoryLogic.createAbilitySectionText('You cut the target loose from what comes next. In the next round it takes its turn last, after all other creatures, and it can\'t take triggered actions until then (save ends).')
					]
				}),
				FactoryLogic.createAbility({
					id: 'cavendish-foretold-end',
					name: 'Foretold End',
					description: 'You do not threaten; you explain, kindly, what is already true.',
					type: FactoryLogic.type.createMain(),
					keywords: [ AbilityKeyword.Magic, AbilityKeyword.Ranged ],
					distance: [ FactoryLogic.distance.createRanged(10) ],
					target: 'One creature',
					cost: 9,
					sections: [
						FactoryLogic.createAbilitySectionText('The target takes 11 + three times your Reason damage, which can\'t be reduced, and is weakened (save ends). If the target is marked by your Foreseen Demise, the prophecy closes: this damage also can\'t be reduced by temporary Stamina, and if it leaves the target winded or lower, the target is dying.')
					]
				}),
				FactoryLogic.createAbility({
					id: 'cavendish-stolen-moment',
					name: 'Stolen Moment',
					description: 'You spend a friend\'s next turn early, while it is still worth spending.',
					type: FactoryLogic.type.createMain(),
					keywords: [ AbilityKeyword.Magic, AbilityKeyword.Ranged ],
					distance: [ FactoryLogic.distance.createRanged(10) ],
					target: 'One ally',
					cost: 9,
					sections: [
						FactoryLogic.createAbilitySectionText('The target immediately takes a full turn (move + main action), then can\'t act on their own next turn.')
					]
				}),
				FactoryLogic.createAbility({
					id: 'cavendish-foregone-conclusion',
					name: 'Foregone Conclusion',
					description: 'You do not predict the round. You file it.',
					type: FactoryLogic.type.createMain(),
					keywords: [ AbilityKeyword.Magic ],
					distance: [ FactoryLogic.distance.createSelf() ],
					target: 'Self',
					cost: 11,
					sections: [
						FactoryLogic.createAbilitySectionText('Choose allies or enemies. Until the end of your next turn, the first power roll each chosen creature makes gains a double edge (if you chose allies) or a double bane (if you chose enemies). A creature can be affected by only one Foregone Conclusion at a time.')
					]
				}),
				FactoryLogic.createAbility({
					id: 'cavendish-the-last-page',
					name: 'The Last Page',
					description: 'You read it its ending, gently, and then simply wait.',
					type: FactoryLogic.type.createMain(),
					keywords: [ AbilityKeyword.Magic, AbilityKeyword.Ranged ],
					distance: [ FactoryLogic.distance.createRanged(10) ],
					target: 'One creature',
					cost: 11,
					sections: [
						FactoryLogic.createAbilitySectionRoll(FactoryLogic.createPowerRoll({
							characteristic: Characteristic.Reason,
							tier1: '8 + R damage; I<w the target cannot achieve a tier 3 result on a power roll (save ends)',
							tier2: '12 + R damage; I<v the target cannot achieve a tier 3 result on a power roll (save ends)',
							tier3: '16 + R damage; I<s the target can only achieve a tier 1 result on a power roll (save ends)'
						})),
						FactoryLogic.createAbilitySectionSpend({
							value: 1,
							effect: 'If the target is marked by your Foreseen Demise, it can\'t roll to end this effect on its first attempt.'
						})
					]
				})
			],
			selected: false
		},
		{
			id: 'thaumaturge-school-collegium',
			name: 'The Collegium',
			description: 'Where another school finesses, the Sunderer unmakes: lines of flame, bursts of force, the spell that ends the argument. They were born to Overchannel, and the Veil knows it.',
			featuresByLevel: [
				{
					level: 1,
					features: [
						FactoryLogic.feature.createPackageContent({
							id: 'collegium-arcane-bolt',
							name: 'Destructive Bolt',
							description: 'Your Arcane Bolt bypasses damage immunity, and does double damage to objects.',
							tag: 'arcane-bolt'
						}),
						FactoryLogic.feature.createSkillChoice({ id: 'collegium-skill', selected: [ 'Alchemy' ], count: 1 }),
						FactoryLogic.feature.create({
							id: 'collegium-ruinous-channeling',
							name: 'Ruinous Channeling',
							description: 'Your magic abilities that affect an area deal additional damage equal to your Reason. When you Overchannel an area ability, that bonus damage doubles.'
						}),
						FactoryLogic.feature.createAbility({
							ability: FactoryLogic.createAbility({
								id: 'collegium-signature',
								name: 'Scorch Line',
								description: 'One stroke of the pen, and everything along it becomes a footnote.',
								type: FactoryLogic.type.createMain(),
								cost: 'signature',
								keywords: [ AbilityKeyword.Area, AbilityKeyword.Magic, AbilityKeyword.Strike ],
								distance: [ FactoryLogic.distance.create({ type: AbilityDistanceType.Line, value: 4, value2: 1 }) ],
								target: 'Each creature in the area',
								sections: [
									FactoryLogic.createAbilitySectionRoll(FactoryLogic.createPowerRoll({
										characteristic: Characteristic.Reason,
										tier1: '4 + R fire damage',
										tier2: '6 + R fire damage',
										tier3: '9 + R fire damage'
									})),
									FactoryLogic.createAbilitySectionSpend({
										value: 1,
										effect: 'The line becomes 8x1.'
									})
								]
							})
						}),
						FactoryLogic.feature.createAbility({
							ability: FactoryLogic.createAbility({
								id: 'collegium-backlash',
								name: 'Backlash',
								description: 'Touch the fire and the fire answers.',
								type: FactoryLogic.type.createTrigger('An enemy hits you with a strike'),
								keywords: [ AbilityKeyword.Magic, AbilityKeyword.Melee ],
								distance: [ FactoryLogic.distance.createMelee(1) ],
								target: 'The attacker',
								sections: [
									FactoryLogic.createAbilitySectionText('The triggering enemy takes fire or force damage equal to twice your Reason.')
								]
							})
						})
					]
				},
				{ level: 2, features: [ FactoryLogic.feature.createClassAbilityChoice({ id: 'collegium-2-ability-3', cost: 3, fromSubclass: true, count: 1 }) ] },
				{ level: 5, features: [
					FactoryLogic.feature.create({
						id: 'collegium-chain-reaction',
						name: 'Chain Reaction',
						description: 'When you reduce one or more enemies to 0 Stamina with a magic ability, each enemy within 2 of one of them takes fire damage equal to twice your Reason, and you regain 2 Essence.'
					})
				] },
				{ level: 6, features: [ FactoryLogic.feature.createClassAbilityChoice({ id: 'collegium-6-ability-7', cost: 7, fromSubclass: true, count: 1 }) ] },
				{ level: 7, features: [
					FactoryLogic.feature.create({
						id: 'collegium-unburnt',
						name: 'Unburnt',
						description: 'You can choose to exclude yourself and your allies from the area of effect of any ability you use that has the Area and Magic keywords.'
					})
				] },
				{ level: 8, features: [
					FactoryLogic.feature.create({
						id: 'collegium-annihilation',
						name: 'Annihilation',
						description: 'Once per encounter, when you use an area magic ability, you can have it deal maximum damage to every enemy in the area instead of rolling, and enlarge the area by 2.'
					})
				] },
				{ level: 9, features: [ FactoryLogic.feature.createClassAbilityChoice({ id: 'collegium-9-ability-9', cost: 9, fromSubclass: true, count: 1 }) ] }
			],
			abilities: [
				FactoryLogic.createAbility({
					id: 'collegium-scorch-line',
					name: 'Scorch Line',
					description: 'One stroke of the pen, and everything along it becomes a footnote.',
					type: FactoryLogic.type.createMain(),
					keywords: [ AbilityKeyword.Area, AbilityKeyword.Magic, AbilityKeyword.Strike ],
					distance: [ FactoryLogic.distance.create({ type: AbilityDistanceType.Line, value: 4, value2: 1 }) ],
					target: 'Each creature in the area',
					sections: [
						FactoryLogic.createAbilitySectionRoll(FactoryLogic.createPowerRoll({
							characteristic: Characteristic.Reason,
							tier1: '4 + R fire damage',
							tier2: '6 + R fire damage',
							tier3: '9 + R fire damage'
						})),
						FactoryLogic.createAbilitySectionSpend({
							value: 1,
							effect: 'The line becomes 8x1.'
						})
					]
				}),
				FactoryLogic.createAbility({
					id: 'collegium-backlash',
					name: 'Backlash',
					description: 'Touch the fire and the fire answers.',
					type: FactoryLogic.type.createTrigger('An enemy hits you with a strike'),
					keywords: [ AbilityKeyword.Magic, AbilityKeyword.Melee ],
					distance: [ FactoryLogic.distance.createMelee() ],
					target: 'The attacker',
					sections: [
						FactoryLogic.createAbilitySectionText('The triggering enemy takes fire or force damage equal to twice your Reason.')
					]
				}),
				FactoryLogic.createAbility({
					id: 'collegium-flame-cone',
					name: 'Flame Cone',
					description: 'The cheapest argument the Collegium knows.',
					type: FactoryLogic.type.createMain(),
					keywords: [ AbilityKeyword.Area, AbilityKeyword.Magic, AbilityKeyword.Strike ],
					distance: [ FactoryLogic.distance.create({ type: AbilityDistanceType.Cube, value: 3 }) ],
					target: 'Each creature in the area',
					cost: 3,
					sections: [
						FactoryLogic.createAbilitySectionRoll(FactoryLogic.createPowerRoll({
							characteristic: Characteristic.Reason,
							tier1: '3 + R fire damage',
							tier2: '5 + R fire damage',
							tier3: '7 + R fire damage'
						})),
						FactoryLogic.createAbilitySectionText('The cube burns, until the end of the round (difficult terrain).')
					]
				}),
				FactoryLogic.createAbility({
					id: 'collegium-force-lance',
					name: 'Force Lance',
					description: 'Just blunt force, delivered at distance. Not everything has to be complicated.',
					type: FactoryLogic.type.createMain(),
					keywords: [ AbilityKeyword.Magic, AbilityKeyword.Ranged, AbilityKeyword.Strike ],
					distance: [ FactoryLogic.distance.createRanged(10) ],
					target: 'One creature',
					cost: 3,
					sections: [
						FactoryLogic.createAbilitySectionRoll(FactoryLogic.createPowerRoll({
							characteristic: Characteristic.Reason,
							tier1: '4 + R damage',
							tier2: '7 + R damage; push 2',
							tier3: '10 + R damage; push 2 and the target is knocked prone'
						}))
					]
				}),
				FactoryLogic.createAbility({
					id: 'collegium-concussive-burst',
					name: 'Concussive Burst',
					description: 'Less a spell than a shove the entire room agrees to feel.',
					type: FactoryLogic.type.createMain(),
					keywords: [ AbilityKeyword.Area, AbilityKeyword.Magic, AbilityKeyword.Strike ],
					distance: [ FactoryLogic.distance.create({ type: AbilityDistanceType.Burst, value: 3 }) ],
					target: 'Each creature in the area',
					cost: 5,
					sections: [
						FactoryLogic.createAbilitySectionRoll(FactoryLogic.createPowerRoll({
							characteristic: Characteristic.Reason,
							tier1: '5 + R damage; push 1',
							tier2: '8 + R damage; push 2',
							tier3: '11 + R damage; push 2 and prone'
						}))
					]
				}),
				FactoryLogic.createAbility({
					id: 'collegium-cinderburn',
					name: 'Cinderburn',
					description: 'A small sun, briefly, and the coals it leaves to make the point.',
					type: FactoryLogic.type.createMain(),
					keywords: [ AbilityKeyword.Area, AbilityKeyword.Magic, AbilityKeyword.Strike ],
					distance: [ FactoryLogic.distance.create({ type: AbilityDistanceType.Burst, value: 3, within: 10 }) ],
					target: 'Each creature in the area',
					cost: 5,
					sections: [
						FactoryLogic.createAbilitySectionRoll(FactoryLogic.createPowerRoll({
							characteristic: Characteristic.Reason,
							tier1: '6 + R fire damage',
							tier2: '9 + R fire damage',
							tier3: '12 + R fire damage;'
						})),
						FactoryLogic.createAbilitySectionText('The area becomes a burning field until the end of your next turn: it is difficult terrain, and a creature that enters or starts its turn there takes R fire damage.'),
						FactoryLogic.createAbilitySectionSpend({
							value: 3,
							effect: 'The burning field lasts until the end of the encounter instead.'
						})
					]
				}),
				FactoryLogic.createAbility({
					id: 'collegium-fulmination',
					name: 'Fulmination',
					description: 'The air picks a side, and it is not theirs.',
					type: FactoryLogic.type.createMain(),
					keywords: [ AbilityKeyword.Area, AbilityKeyword.Magic, AbilityKeyword.Strike ],
					distance: [ FactoryLogic.distance.create({ type: AbilityDistanceType.Burst, value: 4 }) ],
					target: 'Each creature in the area',
					cost: 7,
					sections: [
						FactoryLogic.createAbilitySectionRoll(FactoryLogic.createPowerRoll({
							characteristic: Characteristic.Reason,
							tier1: '7 + R lightning damage',
							tier2: '10 + R lightning damage',
							tier3: '13 + R lightning damage'
						})),
						FactoryLogic.createAbilitySectionText('The area becomes difficult, crackling terrain until the end of the round.')
					]
				}),
				FactoryLogic.createAbility({
					id: 'collegium-firestorm',
					name: 'Firestorm',
					description: 'The argument, sustained.',
					type: FactoryLogic.type.createMain(),
					keywords: [ AbilityKeyword.Area, AbilityKeyword.Magic, AbilityKeyword.Strike ],
					distance: [ FactoryLogic.distance.create({ type: AbilityDistanceType.Burst, value: 5, within: 10 }) ],
					target: 'Each creature in the area',
					cost: 7,
					sections: [
						FactoryLogic.createAbilitySectionRoll(FactoryLogic.createPowerRoll({
							characteristic: Characteristic.Reason,
							tier1: '6 + R fire damage',
							tier2: '9 + R fire damage',
							tier3: '12 + R fire damage'
						})),
						FactoryLogic.createAbilitySectionText('The area becomes a firestorm until the end of your next turn: difficult terrain, and any creature takes fire damage equal to your Reason when it enters the area or starts its turn there.')
					]
				}),
				FactoryLogic.createAbility({
					id: 'collegium-annihilating-beam',
					name: 'Annihilating Beam',
					description: 'One line, drawn through everything that was in the way.',
					type: FactoryLogic.type.createMain(),
					keywords: [ AbilityKeyword.Area, AbilityKeyword.Magic, AbilityKeyword.Strike ],
					distance: [ FactoryLogic.distance.create({ type: AbilityDistanceType.Line, value: 12, value2: 1 }) ],
					target: 'Each creature in the area',
					cost: 9,
					sections: [
						FactoryLogic.createAbilitySectionRoll(FactoryLogic.createPowerRoll({
							characteristic: Characteristic.Reason,
							tier1: '9 + R fire damage',
							tier2: '13 + R fire damage',
							tier3: '17 + R fire damage'
						})),
						FactoryLogic.createAbilitySectionText('The beam ignores cover and destroys mundane objects, barriers, and difficult terrain in its path.')
					]
				}),
				FactoryLogic.createAbility({
					id: 'collegium-cataclysmic-working',
					name: 'Cataclysmic Working',
					description: 'Wild magic explodes from you.',
					type: FactoryLogic.type.createMain(),
					keywords: [ AbilityKeyword.Area, AbilityKeyword.Magic, AbilityKeyword.Strike ],
					distance: [ FactoryLogic.distance.create({ type: AbilityDistanceType.Burst, value: 6 }) ],
					target: 'The area',
					cost: 9,
					sections: [
						FactoryLogic.createAbilitySectionText('The area becomes a field of wild magic. Any creature who enters or starts their turn in the area must roll on the Overchannel table.')
					]
				}),
				FactoryLogic.createAbility({
					id: 'collegium-cataclysm',
					name: 'Cataclysm',
					description: 'The argument the Institute warns you never to make twice.',
					type: FactoryLogic.type.createMain(),
					keywords: [ AbilityKeyword.Area, AbilityKeyword.Magic, AbilityKeyword.Strike ],
					distance: [ FactoryLogic.distance.create({ type: AbilityDistanceType.Burst, value: 6 }) ],
					target: 'Each creature in the area',
					cost: 11,
					sections: [
						FactoryLogic.createAbilitySectionRoll(FactoryLogic.createPowerRoll({
							characteristic: Characteristic.Reason,
							tier1: '10 + R fire damage',
							tier2: '15 + R fire damage',
							tier3: '20 + R fire damage'
						})),
						FactoryLogic.createAbilitySectionText('Each target is bleeding (save ends).')
					]
				}),
				FactoryLogic.createAbility({
					id: 'collegium-ruin',
					name: 'RUIN',
					description: 'The last thing the Collegium teaches, and the only lesson no one forgets.',
					type: FactoryLogic.type.createMain(),
					keywords: [ AbilityKeyword.Area, AbilityKeyword.Magic, AbilityKeyword.Strike ],
					distance: [ FactoryLogic.distance.create({ type: AbilityDistanceType.Burst, value: 5, within: 10 }) ],
					target: 'Each creature in the area',
					cost: 11,
					sections: [
						FactoryLogic.createAbilitySectionRoll(FactoryLogic.createPowerRoll({
							characteristic: Characteristic.Reason,
							tier1: '10 + R fire damage; prone',
							tier2: '16 + R fire damage; prone',
							tier3: '22 + R fire damage; prone'
						})),
						FactoryLogic.createAbilitySectionText('If you Overchannelled this turn, for each point of Essence you are in debt increase the burst size by 1 and add R damage. This damage can\'t be reduced by temporary Stamina.'),
						FactoryLogic.createAbilitySectionSpend({
							value: 3,
							effect: 'The area becomes burning difficult terrain until the end of the encounter. Any creature entering or starting their turn in the area suffers 5 x R fire damage.'
						})
					]
				})
			],
			selected: false
		},
		{
			id: 'thaumaturge-school-dashin-hagwan',
			name: 'The Dashin Hagwan',
			description: 'The Sanctioner doesn\'t out-burn the enemy mage; they make the enemy mage irrelevant. Schooled in Bashra\'s halls of shields, they raise wards, turn workings aside, and keep the soldier next to them alive.',
			featuresByLevel: [
				{
					level: 1,
					features: [
						FactoryLogic.feature.createPackageContent({
							id: 'dashin-arcane-bolt',
							name: 'Warding Bolt',
							description: 'When your Arcane Bolt damages a creature, you or an ally within 5 gains temporary Stamina equal to your Reason.',
							tag: 'arcane-bolt'
						}),
						FactoryLogic.feature.createSkillChoice({ id: 'dashin-skill', selected: [ 'Alertness' ], count: 1 }),
						FactoryLogic.feature.create({
							id: 'dashin-sheltering-ward',
							name: 'Sheltering Ward',
							description: 'As a maneuver, choose yourself or an ally within 10. Until the start of your next turn, the target reduces all damage it takes by an amount equal to your Reason and gains a +2 bonus to saving throws. Spend 1 Essence to extend this to every ally within 3 of the target.'
						}),
						FactoryLogic.feature.createAbility({
							ability: FactoryLogic.createAbility({
								id: 'dashin-signature',
								name: 'Shieldwall',
								description: 'Bashra\'s oldest promise: no one who stands in this line stands alone.',
								type: FactoryLogic.type.createMain(),
								cost: 'signature',
								keywords: [ AbilityKeyword.Magic, AbilityKeyword.Ranged ],
								distance: [ FactoryLogic.distance.createRanged(10) ],
								target: 'One ally',
								sections: [
									FactoryLogic.createAbilitySectionText('The target gains temporary Stamina equal to twice your Reason.')
								]
							})
						}),
						FactoryLogic.feature.createAbility({
							ability: FactoryLogic.createAbility({
								id: 'dashin-interpose',
								name: 'Interpose',
								description: 'A ward flung sideways, faster than thought.',
								type: FactoryLogic.type.createTrigger('An ally within 10 squares takes damage'),
								keywords: [ AbilityKeyword.Magic, AbilityKeyword.Ranged ],
								distance: [ FactoryLogic.distance.createRanged(10) ],
								target: 'One ally',
								sections: [
									FactoryLogic.createAbilitySectionText('Reduce that damage by twice your Reason.')
								]
							})
						})
					]
				},
				{ level: 2, features: [ FactoryLogic.feature.createClassAbilityChoice({ id: 'dashin-2-ability-3', cost: 3, fromSubclass: true, count: 1 }) ] },
				{ level: 5, features: [
					FactoryLogic.feature.create({
						id: 'dashin-dispelling-hand',
						name: 'Dispelling Hand',
						description: 'When a creature within 10 uses a magic ability, you can use a triggered action and spend 3 Essence to reduce that ability\'s potency by 1 and its damage by twice your Reason. If the ability would create a lasting effect, aura, or summon, it instead lasts only until the end of the round.'
					})
				] },
				{ level: 6, features: [ FactoryLogic.feature.createClassAbilityChoice({ id: 'dashin-6-ability-7', cost: 7, fromSubclass: true, count: 1 }) ] },
				{ level: 7, features: [
					FactoryLogic.feature.create({
						id: 'dashin-warded-overchanneling',
						name: 'Warded Overchanneling',
						description: 'When you would take damage as a result of Overchanneling, you take no damage.'
					})
				] },
				{ level: 8, features: [
					FactoryLogic.feature.create({
						id: 'dashin-unbreached-ground',
						name: 'Unbreached Ground',
						description: 'As a main action, spend 7 Essence to raise a sanctum in a 5 burst around you until the end of the encounter or until you leave it. Allies inside reduce magic damage by your Reason and can\'t be subjected to conditions by magic abilities; enemies inside take a bane on magic abilities and have their magic potencies reduced by 1.'
					})
				] },
				{ level: 9, features: [ FactoryLogic.feature.createClassAbilityChoice({ id: 'dashin-9-ability-9', cost: 9, fromSubclass: true, count: 1 }) ] }
			],
			abilities: [
				FactoryLogic.createAbility({
					id: 'dashin-ward',
					name: 'Ward',
					description: 'The air in front of you refuses to accept the strike.',
					type: FactoryLogic.type.createManeuver(),
					keywords: [ AbilityKeyword.Magic, AbilityKeyword.Ranged ],
					distance: [ FactoryLogic.distance.createSelf(), FactoryLogic.distance.createRanged(10) ],
					target: 'Self or one ally',
					cost: 3,
					sections: [
						FactoryLogic.createAbilitySectionText('The target gains temporary Stamina equal to three times your Reason. Spend 3+: For every 3 points you spend, you can target an additional ally.')
					]
				}),
				FactoryLogic.createAbility({
					id: 'dashin-reflect',
					name: 'Reflect',
					description: 'The first lesson of Bashra: a working turned aside is a working turned around.',
					type: FactoryLogic.type.createManeuver(),
					keywords: [ AbilityKeyword.Magic ],
					distance: [ FactoryLogic.distance.createSelf() ],
					target: 'Self',
					cost: 3,
					sections: [
						FactoryLogic.createAbilitySectionText('Until the start of your next turn, the first time a creature hits you with a magic ability, you halve the damage you take and the creature takes damage equal to twice your Reason of the same type.')
					]
				}),
				FactoryLogic.createAbility({
					id: 'dashin-unmaking',
					name: 'Unmaking',
					description: 'Whatever they called up, you send politely back where it came from.',
					type: FactoryLogic.type.createMain(),
					keywords: [ AbilityKeyword.Magic, AbilityKeyword.Ranged ],
					distance: [ FactoryLogic.distance.createRanged(10) ],
					target: 'One creature or magical effect',
					cost: 5,
					sections: [
						FactoryLogic.createAbilitySectionText('End one magic effect or aura on the target or in the area, and deal 2 × Reason damage to any summoned or conjured creature there.')
					]
				}),
				FactoryLogic.createAbility({
					id: 'dashin-unweave',
					name: 'Unweave',
					description: 'You find the loose end of their working and pull - gently, at the worst possible moment.',
					type: FactoryLogic.type.createTrigger('The target uses a magic ability'),
					keywords: [ AbilityKeyword.Magic, AbilityKeyword.Ranged ],
					distance: [ FactoryLogic.distance.createRanged(10) ],
					target: 'One creature',
					cost: 5,
					sections: [
						FactoryLogic.createAbilitySectionText('Reduce the damage of the target’s ability by your Reason, and its potency by 2.')
					]
				}),
				FactoryLogic.createAbility({
					id: 'dashin-aegis-of-the-line',
					name: 'Aegis of the Line',
					description: 'One ward, stretched thin across the whole line, somehow holding.',
					type: FactoryLogic.type.createMain(),
					keywords: [ AbilityKeyword.Magic, AbilityKeyword.Ranged ],
					distance: [ FactoryLogic.distance.createRanged(10) ],
					target: 'Self and each ally',
					cost: 7,
					sections: [
						FactoryLogic.createAbilitySectionText('Until the start of your next turn, the first time any target would take damage, that damage is reduced by an amount equal to twice your Reason.')
					]
				}),
				FactoryLogic.createAbility({
					id: 'dashin-retributive-aegis',
					name: 'Retributive Aegis',
					description: 'Bashra\'s line does not merely hold. It answers.',
					type: FactoryLogic.type.createMain(),
					keywords: [ AbilityKeyword.Area, AbilityKeyword.Magic ],
					distance: [ FactoryLogic.distance.create({ type: AbilityDistanceType.Burst, value: 3, within: 10 }) ],
					target: 'Each ally in the area',
					cost: 7,
					sections: [
						FactoryLogic.createAbilitySectionText('Until the start of your next turn, each affected ally reduces all damage it takes by R, and any creature that hits a target with a strike takes force damage equal to 2 × R.'),
						FactoryLogic.createAbilitySectionSpend({
							value: 3,
							effect: 'The first time each target would be reduced to winded, it is instead left at 1 above winded.'
						})
					]
				}),
				FactoryLogic.createAbility({
					id: 'dashin-last-bastion',
					name: 'Last Bastion',
					description: 'Not today. The ward decides that on their behalf.',
					type: FactoryLogic.type.createTrigger('An ally within 10 would be reduced to 0 Stamina'),
					keywords: [ AbilityKeyword.Magic, AbilityKeyword.Ranged ],
					distance: [ FactoryLogic.distance.createRanged(10) ],
					target: 'One ally',
					cost: 9,
					sections: [
						FactoryLogic.createAbilitySectionText('The ally instead drops to 1 Stamina and gains temporary Stamina equal to 3 × your Reason.')
					]
				}),
				FactoryLogic.createAbility({
					id: 'dashin-greater-ward',
					name: 'Greater Ward',
					description: 'For one held breath, the war agrees to leave you out of it.',
					type: FactoryLogic.type.createManeuver(),
					keywords: [ AbilityKeyword.Magic, AbilityKeyword.Ranged ],
					distance: [ FactoryLogic.distance.createRanged(5) ],
					target: 'Self and each ally',
					cost: 9,
					sections: [
						FactoryLogic.createAbilitySectionText('Until the start of your next turn, the target gains damage immunity equal to your Reason and can\'t be subjected to conditions by magic abilities.')
					]
				}),
				FactoryLogic.createAbility({
					id: 'dashin-sever-the-weave',
					name: 'Sever the Weave',
					description: 'One clean cut, drawn across everything holding the moment together.',
					type: FactoryLogic.type.createMain(),
					keywords: [ AbilityKeyword.Area, AbilityKeyword.Magic, AbilityKeyword.Strike ],
					distance: [ FactoryLogic.distance.create({ type: AbilityDistanceType.Cube, value: 5, within: 10 }) ],
					target: 'Each creature in the area',
					cost: 11,
					sections: [
						FactoryLogic.createAbilitySectionRoll(FactoryLogic.createPowerRoll({
							characteristic: Characteristic.Reason,
							tier1: '8 + R damage',
							tier2: '12 + R damage; dazed (EoT)',
							tier3: '16 + R damage; dazed (save ends)'
						})),
						FactoryLogic.createAbilitySectionText('Any aura or ongoing magical effect within the area is ended. Any summoned creature within the area is unsummoned.')
					]
				}),
				FactoryLogic.createAbility({
					id: 'dashin-inviolate',
					name: 'Inviolate',
					description: '“No”.',
					type: FactoryLogic.type.createMain(),
					keywords: [ AbilityKeyword.Area, AbilityKeyword.Magic ],
					distance: [ FactoryLogic.distance.create({ type: AbilityDistanceType.Burst, value: 5 }) ],
					target: 'Each ally in the area',
					cost: 11,
					sections: [
						FactoryLogic.createAbilitySectionText('Until the end of your next turn, the target can\'t be reduced below 1 Stamina, and can\'t be subjected to conditions or forced movement by magic or psionic abilities.'),
						FactoryLogic.createAbilitySectionSpend({
							value: 3,
							effect: 'Each target can also end one condition currently affecting them.'
						})
					]
				})
			],
			selected: false
		},
		{
			id: 'thaumaturge-school-ginnhall',
			name: 'The Ginnhall',
			description: 'Valhaven\'s Ginnhall teaches the charm and the lie as a single craft, and graduates the Gardeners into the shadows. The Beguiler turns enemies into doubts and the field into a hall of mirrors: minds bent one way, eyes sent another.',
			featuresByLevel: [
				{
					level: 1,
					features: [
						FactoryLogic.feature.createPackageContent({
							id: 'ginnhall-arcane-bolt',
							name: 'Maddening Bolt',
							description: 'Your Arcane Bolt can deal psychic damage instead of its usual type; when it does, on a tier 2+ the target can\'t make opportunity attacks until the end of its next turn, and on a tier 3 it is dazed (save ends).',
							tag: 'arcane-bolt'
						}),
						FactoryLogic.feature.createSkillChoice({ id: 'ginnhall-skill', selected: [ 'Lie' ], count: 1 }),
						FactoryLogic.feature.create({
							id: 'ginnhall-mirror',
							name: 'Mirror',
							description: 'As a maneuver, spend 1 Essence and choose an enemy within 10. It is charmed until the end of your next turn - while charmed, it can\'t include you or your allies as targets of its abilities. The charm ends early if the target takes damage.'
						}),
						FactoryLogic.feature.createAbility({
							ability: FactoryLogic.createAbility({
								id: 'ginnhall-signature',
								name: 'Honeyed Word',
								description: 'Not a command - a suggestion, offered sweetly enough that they decide to keep it.',
								type: FactoryLogic.type.createMain(),
								cost: 'signature',
								keywords: [ AbilityKeyword.Magic, AbilityKeyword.Ranged ],
								distance: [ FactoryLogic.distance.createRanged(10) ],
								target: 'One creature',
								sections: [
									FactoryLogic.createAbilitySectionRoll(FactoryLogic.createPowerRoll({
										characteristic: Characteristic.Reason,
										tier1: '2 psychic damage; R<w charmed (EoT)',
										tier2: '3 psychic damage; R<v charmed (EoT)',
										tier3: '5 psychic damage; R<s charmed (EoT)'
									})),
									FactoryLogic.createAbilitySectionText('While the target is charmed, it cannot include you as a target of its abilities.')
								]
							})
						}),
						FactoryLogic.feature.createAbility({
							ability: FactoryLogic.createAbility({
								id: 'ginnhall-phantom-step',
								name: 'Phantom Step',
								description: 'You were never quite where the blade went.',
								type: FactoryLogic.type.createTrigger('An enemy targets you with a strike'),
								keywords: [ AbilityKeyword.Magic ],
								distance: [ FactoryLogic.distance.createSelf() ],
								target: 'Self',
								sections: [
									FactoryLogic.createAbilitySectionText('An illusory double takes your place: the attacker takes a bane on the strike, and you shift 1 square.')
								]
							})
						})
					]
				},
				{ level: 2, features: [ FactoryLogic.feature.createClassAbilityChoice({ id: 'ginnhall-2-ability-3', cost: 3, fromSubclass: true, count: 1 }) ] },
				{ level: 5, features: [
					FactoryLogic.feature.create({
						id: 'ginnhall-domination',
						name: 'Domination',
						description: 'As a main action, spend 5 Essence and choose a charmed or frightened enemy within 10. It is dominated (EoT): you direct one action it takes on its next turn - a strike, a move, or a signature ability. You cannot direct it to spend Malice.'
					})
				] },
				{ level: 6, features: [ FactoryLogic.feature.createClassAbilityChoice({ id: 'ginnhall-6-ability-7', cost: 7, fromSubclass: true, count: 1 }) ] },
				{ level: 7, features: [
					FactoryLogic.feature.create({
						id: 'ginnhall-cloud-the-mind',
						name: 'Cloud the Mind',
						description: 'When you Overchannel, you gain concealment until the start of your next turn.'
					})
				] },
				{ level: 8, features: [
					FactoryLogic.feature.create({
						id: 'ginnhall-hall-of-mirrors',
						name: 'Hall of Mirrors',
						description: 'As a main action, spend 7 Essence to fill a 5 burst with phantasms until the start of your next turn. Enemies inside treat all creatures (including allies) as concealed and can\'t tell illusions from the real, taking a bane on all strikes; your allies ignore the effect.'
					})
				] },
				{ level: 9, features: [ FactoryLogic.feature.createClassAbilityChoice({ id: 'ginnhall-9-ability-9', cost: 9, fromSubclass: true, count: 1 }) ] }
			],
			abilities: [
				FactoryLogic.createAbility({
					id: 'ginnhall-beguiling-whisper',
					name: 'Beguiling Whisper',
					description: 'A certain word, briefly. The doubt comes later.',
					type: FactoryLogic.type.createManeuver(),
					keywords: [ AbilityKeyword.Magic, AbilityKeyword.Ranged ],
					distance: [ FactoryLogic.distance.createRanged(10) ],
					target: 'One creature',
					cost: 3,
					sections: [
						FactoryLogic.createAbilitySectionText('The target is charmed until the end of your next turn - while charmed, it can\'t include you or your allies as targets of its abilities. The charm ends early if the target takes damage.')
					]
				}),
				FactoryLogic.createAbility({
					id: 'ginnhall-blur',
					name: 'Blur',
					description: 'The edges of you stop agreeing on where you are.',
					type: FactoryLogic.type.createManeuver(),
					keywords: [ AbilityKeyword.Magic, AbilityKeyword.Ranged ],
					distance: [ FactoryLogic.distance.createSelf(), FactoryLogic.distance.createRanged(10) ],
					target: 'Self or one ally',
					cost: 3,
					sections: [
						FactoryLogic.createAbilitySectionText('Until the start of your next turn, the target gains concealment, and the first time each round a creature strikes the target, that creature takes a bane on the power roll.'),
						FactoryLogic.createAbilitySectionSpend({
							value: 1,
							effect: 'When an attacker makes a strike against the target, the attacker takes psychic damage equal to R.'
						})
					]
				}),
				FactoryLogic.createAbility({
					id: 'ginnhall-wave-of-fear',
					name: 'Wave of Fear',
					description: 'Something they had kept carefully folded away, unfolded all at once.',
					type: FactoryLogic.type.createMain(),
					keywords: [ AbilityKeyword.Area, AbilityKeyword.Magic ],
					distance: [ FactoryLogic.distance.create({ type: AbilityDistanceType.Burst, value: 3 }) ],
					target: 'Each enemy in the area',
					cost: 5,
					sections: [
						FactoryLogic.createAbilitySectionRoll(
							FactoryLogic.createPowerRoll({
								characteristic: Characteristic.Reason,
								tier1: 'P < [weak] frightened (EoT)',
								tier2: 'P < [average] frightened (save ends)',
								tier3: 'P < [strong] frightened (save ends), and the target must move away from you on its next turn'
							})
						)
					]
				}),
				FactoryLogic.createAbility({
					id: 'ginnhall-fracture',
					name: 'Fracture',
					description: 'One hairline crack, run all the way down the middle of a mind.',
					type: FactoryLogic.type.createMain(),
					keywords: [ AbilityKeyword.Magic, AbilityKeyword.Ranged ],
					distance: [ FactoryLogic.distance.createRanged(10) ],
					target: 'One creature',
					cost: 5,
					sections: [
						FactoryLogic.createAbilitySectionRoll(FactoryLogic.createPowerRoll({
							characteristic: Characteristic.Reason,
							tier1: '4 + R psychic damage; I < [weak] dazed (EoT)',
							tier2: '6 + R psychic damage; I < [average] dazed (save ends)',
							tier3: '9 + R psychic damage; I < [strong] dazed (save ends)'
						})),
						FactoryLogic.createAbilitySectionText('While dazed in this way, the target treats one creature of your choice as its enemy.'),
						FactoryLogic.createAbilitySectionSpend({
							value: 1,
							effect: 'The target cannot make opportunity attacks while dazed.'
						})
					]
				}),
				FactoryLogic.createAbility({
					id: 'ginnhall-pandemonium',
					name: 'Pandemonium',
					description: 'The Ginnhall’s unkindest trick: not a lie about them, but a lie about everyone they trust.',
					type: FactoryLogic.type.createMain(),
					keywords: [ AbilityKeyword.Area, AbilityKeyword.Magic ],
					distance: [ FactoryLogic.distance.create({ type: AbilityDistanceType.Burst, value: 5, within: 10 }) ],
					target: 'Each enemy in the area',
					cost: 7,
					sections: [
						FactoryLogic.createAbilitySectionRoll(
							FactoryLogic.createPowerRoll({
								characteristic: Characteristic.Reason,
								tier1: 'I < [weak] dazed (EoT)',
								tier2: 'I < [average] dazed (EoT)',
								tier3: 'I < [strong] dazed (save ends)'
							})
						),
						FactoryLogic.createAbilitySectionText('On a tier 2 or 3 result, the target perceives its allies as enemies - on its turn, you can have it use its action to make a strike against the nearest creature of your choice.')
					]
				}),
				FactoryLogic.createAbility({
					id: 'ginnhall-seize-the-mind',
					name: 'Seize the Mind',
					description: 'You don\'t persuade. You move in and rearrange the furniture.',
					type: FactoryLogic.type.createMain(),
					keywords: [ AbilityKeyword.Magic, AbilityKeyword.Ranged ],
					distance: [ FactoryLogic.distance.createRanged(10) ],
					target: 'One creature',
					cost: 7,
					sections: [
						FactoryLogic.createAbilitySectionRoll(
							FactoryLogic.createPowerRoll({
								characteristic: Characteristic.Reason,
								tier1: 'I < [weak] dazed (save ends)',
								tier2: 'I < [average] dominated (EoT)',
								tier3: 'I < [strong] dominated (save ends)'
							})
						),
						FactoryLogic.createAbilitySectionText('While the target is dominated, you spend its actions as your own. You cannot direct it to spend Malice. This ability cannot target leaders, elites, or solos.')
					]
				}),
				FactoryLogic.createAbility({
					id: 'ginnhall-the-puppet-court',
					name: 'The Puppet Court',
					description: 'You bow and the court bows back, because you are holding all their strings now.',
					type: FactoryLogic.type.createMain(),
					keywords: [ AbilityKeyword.Magic, AbilityKeyword.Ranged ],
					distance: [ FactoryLogic.distance.createRanged(10) ],
					target: 'Up to three creatures',
					cost: 9,
					sections: [
						FactoryLogic.createAbilitySectionRoll(FactoryLogic.createPowerRoll({
							characteristic: Characteristic.Reason,
							tier1: 'R<w charmed (save ends)',
							tier2: 'R<v dominated (EoT)',
							tier3: 'R<s dominated (save ends)'
						})),
						FactoryLogic.createAbilitySectionText('You direct each dominated target\'s action and move on its turn. You cannot direct a target to spend Malice. While charmed, a target can\'t include you or your allies as targets of its abilities. Spend 3+: The ability targets an additional creature for each additional 3 essence spent.')
					]
				}),
				FactoryLogic.createAbility({
					id: 'ginnhall-hall-of-nightmares',
					name: 'Hall of Nightmares',
					description: 'Norrstup\'s cruellest classroom: a room that shows each person the thing they brought in with them.',
					type: FactoryLogic.type.createMain(),
					keywords: [ AbilityKeyword.Area, AbilityKeyword.Magic ],
					distance: [ FactoryLogic.distance.create({ type: AbilityDistanceType.Burst, value: 5, within: 10 }) ],
					target: 'The area',
					cost: 9,
					sections: [
						FactoryLogic.createAbilitySectionText('You raise a persistent illusion until the end of the encounter. While an enemy is in the area it is frightened (P<v, save ends) and perceives its allies as enemies. An enemy that enters or starts its turn in the area is subjected to this effect anew.'),
						FactoryLogic.createAbilitySectionSpend({
							value: 1,
							effect: 'The first time each enemy fails a save here, it also takes psychic damage equal to 2 × R.'
						})
					]
				}),
				FactoryLogic.createAbility({
					id: 'ginnhall-the-whole-world-lies',
					name: 'The Whole World Lies',
					description: 'The Ginnhall’s masterwork: not one lie, but every eye in the room told a different one.',
					type: FactoryLogic.type.createMain(),
					keywords: [ AbilityKeyword.Area, AbilityKeyword.Magic ],
					distance: [ FactoryLogic.distance.create({ type: AbilityDistanceType.Burst, value: 10 }) ],
					target: 'Each enemy in the area',
					cost: 11,
					sections: [
						FactoryLogic.createAbilitySectionRoll(FactoryLogic.createPowerRoll({
							characteristic: Characteristic.Reason,
							tier1: 'P<w the target is either charmed or frightened (its choice) (save ends)',
							tier2: 'P<v the target is either charmed or frightened (its choice) (save ends)',
							tier3: 'P<s the target is either charmed or frightened (its choice) (save ends)'
						})),
						FactoryLogic.createAbilitySectionText('If charmed, a target can\'t include you or your allies as targets. A leader, elite, or solo gains a +2 bonus to saving throws to end this effect.'),
						FactoryLogic.createAbilitySectionSpend({
							value: 1,
							effect: 'A creature that saves is then dazed until the end of its next turn.'
						})
					]
				}),
				FactoryLogic.createAbility({
					id: 'ginnhall-usurp',
					name: 'Usurp',
					description: 'You do not borrow the hand; you move into the house.',
					type: FactoryLogic.type.createMain(),
					keywords: [ AbilityKeyword.Magic, AbilityKeyword.Ranged ],
					distance: [ FactoryLogic.distance.createRanged(10) ],
					target: 'One creature',
					cost: 11,
					sections: [
						FactoryLogic.createAbilitySectionRoll(FactoryLogic.createPowerRoll({
							characteristic: Characteristic.Reason,
							tier1: 'R<w dominated (EoT)',
							tier2: 'R<v dominated (save ends)',
							tier3: 'R<s dominated (save ends), and immediately on taking control you compel the target to use a signature abilitie against a creature of your choice.'
						})),
						FactoryLogic.createAbilitySectionText('While the target is dominated, you spend its actions as your own. You cannot direct it to spend Malice. A leader, elite, or solo gains a +2 bonus to saving throws to end this effect.')
					]
				})
			],
			selected: false
		},
		{
			id: 'thaumaturge-school-hetaeria-occulta',
			name: 'The Hetaeria Occulta',
			description: 'The thing the orthodox fear most. A Gatecaller opens ways and calls things through - and in a world whose apocalypse is precisely things coming through the Veil, that is not a comfortable gift. They conjure walls and blades out of empty air, and step across distance as if it were a courtesy.',
			featuresByLevel: [
				{
					level: 1,
					features: [
						FactoryLogic.feature.createPackageContent({
							id: 'hetaeria-arcane-bolt',
							name: 'Conjured Bolt',
							description: 'Your Arcane Bolt opens gateways; on a tier 3, you can teleport the target up to 5 squares.',
							tag: 'arcane-bolt'
						}),
						FactoryLogic.feature.createSkillChoice({ id: 'hetaeria-skill', selected: [ 'Timescape' ], count: 1 }),
						FactoryLogic.feature.create({
							id: 'hetaeria-open-the-gate',
							name: 'Open the Gate',
							description: 'As a maneuver, conjure a gate in an unoccupied square within 10 (it persists until the end of the encounter). You can have multiple gates active. Step Through: as a maneuver, teleport yourself or an ally within 10 squares of you to a square adjacent to a gate, or teleport an enemy adjacent to a gate up to 3 squares.'
						}),
						FactoryLogic.feature.createAbility({
							ability: FactoryLogic.createAbility({
								id: 'hetaeria-signature',
								name: 'Bound Blade',
								description: 'You reach into the empty air, and find a hilt already waiting.',
								type: FactoryLogic.type.createMain(),
								cost: 'signature',
								keywords: [ AbilityKeyword.Magic ],
								distance: [ FactoryLogic.distance.createMelee(1) ],
								target: 'One creature or object',
								sections: [
									FactoryLogic.createAbilitySectionText('You conjure a weapon and teleport up to 3 squares, then make a power roll.'),
									FactoryLogic.createAbilitySectionRoll(FactoryLogic.createPowerRoll({
										characteristic: Characteristic.Reason,
										tier1: '2 + R damage',
										tier2: '4 + R damage',
										tier3: '6 + R damage'
									})),
									FactoryLogic.createAbilitySectionSpend({
										value: 1,
										effect: 'Your next weapon strike this turn deals an extra 2 x Reason damage and can be made at Ranged 5.'
									})
								]
							})
						}),
						FactoryLogic.feature.createAbility({
							ability: FactoryLogic.createAbility({
								id: 'hetaeria-sidestep',
								name: 'Sidestep',
								description: 'The square you were standing in was only ever a suggestion.',
								type: FactoryLogic.type.createTrigger('You or an ally within 5 squares takes damage'),
								keywords: [ AbilityKeyword.Magic, AbilityKeyword.Ranged ],
								distance: [ FactoryLogic.distance.createRanged(5) ],
								target: 'You or one ally',
								sections: [
									FactoryLogic.createAbilitySectionText('Teleport the target up to a number of squares equal to your Reason.')
								]
							})
						})
					]
				},
				{ level: 2, features: [ FactoryLogic.feature.createClassAbilityChoice({ id: 'hetaeria-2-ability-3', cost: 3, fromSubclass: true, count: 1 }) ] },
				{ level: 5, features: [
					FactoryLogic.feature.create({
						id: 'hetaeria-open-the-way',
						name: 'Open the Way',
						description: 'As a maneuver, spend 3 Essence to teleport yourself and each ally within 5 up to a number of squares equal to twice your Reason. As a triggered action, you can spend 1 Essence to teleport an ally up to your Reason when they would take damage.'
					})
				] },
				{ level: 6, features: [ FactoryLogic.feature.createClassAbilityChoice({ id: 'hetaeria-6-ability-7', cost: 7, fromSubclass: true, count: 1 }) ] },
				{ level: 7, features: [
					FactoryLogic.feature.create({
						id: 'hetaeria-waygate',
						name: 'Waygate',
						description: 'When you Overchannel, you can immediately teleport up to your speed and make a free strike.'
					})
				] },
				{ level: 8, features: [
					FactoryLogic.feature.create({
						id: 'hetaeria-breach',
						name: 'Breach',
						description: 'As a main action, spend 7 Essence to tear a gate and banish a non-leader, non-solo enemy within 10 (save ends - while banished it is removed from the encounter, returning dazed in the space it left).'
					})
				] },
				{ level: 9, features: [ FactoryLogic.feature.createClassAbilityChoice({ id: 'hetaeria-9-ability-9', cost: 9, fromSubclass: true, count: 1 }) ] }
			],
			abilities: [
				FactoryLogic.createAbility({
					id: 'hetaeria-displace',
					name: 'Displace',
					description: 'You ensure that this place no longer concerns your foe.',
					type: FactoryLogic.type.createMain(),
					keywords: [ AbilityKeyword.Magic, AbilityKeyword.Ranged ],
					distance: [ FactoryLogic.distance.createRanged(10) ],
					target: 'One enemy',
					cost: 3,
					sections: [
						FactoryLogic.createAbilitySectionText('The target makes a Might test:'),
						FactoryLogic.createAbilitySectionText('11 or lower: The target is teleported up to twice your Reason  12-16: The target is teleported up to your Reason  17+: No effect')
					]
				}),
				FactoryLogic.createAbility({
					id: 'hetaeria-glimmerstep',
					name: 'Glimmerstep',
					description: 'You were there. Precisely where you are now is left as an exercise for the reader.',
					type: FactoryLogic.type.createManeuver(),
					keywords: [ AbilityKeyword.Magic, AbilityKeyword.Ranged ],
					distance: [ FactoryLogic.distance.createRanged(5) ],
					target: 'One creature',
					cost: 3,
					sections: [
						FactoryLogic.createAbilitySectionText('You swap places with the target.'),
						FactoryLogic.createAbilitySectionSpend({
							value: 1,
							effect: 'You can also teleport one adjacent creature; it must end adjacent to you.'
						})
					]
				}),
				FactoryLogic.createAbility({
					id: 'hetaeria-conjured-barrier',
					name: 'Conjured Barrier',
					description: 'A wall that was not there, and a breath ago did not need to be.',
					type: FactoryLogic.type.createManeuver(),
					keywords: [ AbilityKeyword.Area, AbilityKeyword.Magic ],
					distance: [ FactoryLogic.distance.create({ type: AbilityDistanceType.Line, value: 5, value2: 1, within: 10 }) ],
					target: 'The area',
					cost: 5,
					sections: [
						FactoryLogic.createAbilitySectionText('Conjure a wall up to 5 squares long that blocks movement until the end of your next turn.'),
						FactoryLogic.createAbilitySectionSpend({
							value: 2,
							effect: 'The wall also blocks line of effect.'
						})
					]
				}),
				FactoryLogic.createAbility({
					id: 'hetaeria-veilrend',
					name: 'Veilrend',
					description: 'You tear a little, and the world does not sit flat again for some time.',
					type: FactoryLogic.type.createMain(),
					keywords: [ AbilityKeyword.Area, AbilityKeyword.Magic, AbilityKeyword.Strike ],
					distance: [ FactoryLogic.distance.create({ type: AbilityDistanceType.Cube, value: 3, within: 10 }) ],
					target: 'The area',
					cost: 5,
					sections: [
						FactoryLogic.createAbilitySectionRoll(FactoryLogic.createPowerRoll({
							characteristic: Characteristic.Reason,
							tier1: '6 + R damage',
							tier2: '10 + R damage',
							tier3: '14 + R damage'
						})),
						FactoryLogic.createAbilitySectionText('The area becomes difficult terrain until the end of the encounter,')
					]
				}),
				FactoryLogic.createAbility({
					id: 'hetaeria-forced-translocation',
					name: 'Forced Translocation',
					description: 'You gather them up like chess pieces and set them down somewhere worse.',
					type: FactoryLogic.type.createMain(),
					keywords: [ AbilityKeyword.Area, AbilityKeyword.Magic ],
					distance: [ FactoryLogic.distance.create({ type: AbilityDistanceType.Burst, value: 3, within: 10 }) ],
					target: 'Each enemy in the area',
					cost: 7,
					sections: [
						FactoryLogic.createAbilitySectionText('Each enemy makes a Might test:'),
						FactoryLogic.createAbilitySectionText('11 or lower: The target is teleported up to twice your Reason, and takes R force damage  12-16: The target is teleported up to your Reason  17+: No effect')
					]
				}),
				FactoryLogic.createAbility({
					id: 'hetaeria-phase',
					name: 'Phase',
					description: 'Walls become, briefly, a matter of opinion - and you disagree with them.',
					type: FactoryLogic.type.createManeuver(),
					keywords: [ AbilityKeyword.Magic, AbilityKeyword.Ranged ],
					distance: [ FactoryLogic.distance.createRanged(3) ],
					target: 'Self and each ally',
					cost: 7,
					sections: [
						FactoryLogic.createAbilitySectionText('Until the start of your next turn, the target can move through creatures and objects and ignore difficult terrain.')
					]
				}),
				FactoryLogic.createAbility({
					id: 'hetaeria-the-drawing-gyre',
					name: 'The Drawing Gyre',
					description: 'A small hunger opens in the air, and everything begins to lean toward it.',
					type: FactoryLogic.type.createMain(),
					keywords: [ AbilityKeyword.Area, AbilityKeyword.Magic, AbilityKeyword.Strike ],
					distance: [ FactoryLogic.distance.create({ type: AbilityDistanceType.Burst, value: 5, within: 10 }) ],
					target: 'Each creature in the area',
					cost: 9,
					sections: [
						FactoryLogic.createAbilitySectionText('The spell creates an area of storm which lasts until the end of your next turn; each creature who enters or starts their turn in the area must make a Might test:'),
						FactoryLogic.createAbilitySectionText('11 or lower: 12 damage; pull 4 toward the centre of the area  12-16: 7 damage; pull 2 toward the centre of the area  17+: 4 damage'),
						FactoryLogic.createAbilitySectionField({
							name: 'Special',
							effect: 'As a manoeuvre on your next turn, you can spend 3 essence to maintain the gyre for an additional round.'
						})
					]
				}),
				FactoryLogic.createAbility({
					id: 'hetaeria-the-yawning-gate',
					name: 'The Yawning Gate',
					description: 'You open the very thing they are all afraid of.',
					type: FactoryLogic.type.createMain(),
					keywords: [ AbilityKeyword.Area, AbilityKeyword.Magic ],
					distance: [ FactoryLogic.distance.create({ type: AbilityDistanceType.Burst, value: 5, within: 10 }) ],
					target: 'Each enemy in the area',
					cost: 9,
					sections: [
						FactoryLogic.createAbilitySectionRoll(
							FactoryLogic.createPowerRoll({
								characteristic: Characteristic.Reason,
								tier1: 'M<w slide 3 toward the rift\'s centre',
								tier2: 'M<v banished (EoT)',
								tier3: 'M<s banished (save ends)'
							})
						),
						FactoryLogic.createAbilitySectionText('A banished creature is removed from the encounter, returning dazed in the space it left when the effect ends. The rift remains until the end of the encounter: its area is difficult terrain, and an enemy that enters it takes force damage equal to twice your Reason.')
					]
				}),
				FactoryLogic.createAbility({
					id: 'hetaeria-the-long-fall',
					name: 'The Long Fall',
					description: 'You open up the bottom of the world, and are very precise about who stands over it.',
					type: FactoryLogic.type.createMain(),
					keywords: [ AbilityKeyword.Area, AbilityKeyword.Magic ],
					distance: [ FactoryLogic.distance.create({ type: AbilityDistanceType.Burst, value: 5, within: 10 }) ],
					target: 'Each enemy in the area',
					cost: 11,
					sections: [
						FactoryLogic.createAbilitySectionRoll(
							FactoryLogic.createPowerRoll({
								characteristic: Characteristic.Reason,
								tier1: 'M<w banished (EoT)',
								tier2: 'M<v banished (save ends)',
								tier3: 'M<s banished (save ends), and each time the target fails the saving throw it takes damage equal to twice your Reason as it falls'
							})
						),
						FactoryLogic.createAbilitySectionText('A banished creature is removed from the encounter and returns prone in the space it left when the effect ends. A leader, elite, or solo gains a +2 bonus to saving throws to end this effect.')
					]
				}),
				FactoryLogic.createAbility({
					id: 'hetaeria-fold-space',
					name: 'Fold Space',
					description: 'A Gatecaller\'s final victory over geography.',
					type: FactoryLogic.type.createMain(),
					keywords: [ AbilityKeyword.Area, AbilityKeyword.Magic ],
					distance: [ FactoryLogic.distance.create({ type: AbilityDistanceType.Burst, value: 10 }) ],
					target: 'Special',
					cost: 11,
					sections: [
						FactoryLogic.createAbilitySectionText('You may swap the positions of any number of pairs of creatures within the area, then place a number of gates equal to your Reason in unoccupied squares in the area.'),
						FactoryLogic.createAbilitySectionSpend({
							value: 5,
							effect: 'Each enemy you moved this way takes force damage equal to 2 × R on arrival.'
						})
					]
				})
			],
			selected: false
		},
		{
			id: 'thaumaturge-school-magisterium',
			name: 'The Magisterium',
			description: 'Icewell\'s Magisterium refines aether and reshapes the world. The Shaper alters what is: hardening a friend\'s skin, withering a foe\'s strength, turning ground to tar - and, at need, remaking their own body into something the moment requires.',
			featuresByLevel: [
				{
					level: 1,
					features: [
						FactoryLogic.feature.createPackageContent({
							id: 'magisterium-arcane-bolt',
							name: 'Warping Bolt',
							description: 'On a tier 3 result for your Arcane Bolt, the target is weakened (save ends) as its substance frays.',
							tag: 'arcane-bolt'
						}),
						FactoryLogic.feature.createSkillChoice({ id: 'magisterium-skill', selected: [ 'Architecture' ], count: 1 }),
						FactoryLogic.feature.create({
							id: 'magisterium-alteration',
							name: 'Alteration',
							description: 'As a maneuver, spend 1 Essence and choose a creature within 10: an ally gains temporary Stamina equal to your Reason and an edge on power rolls until the end of your next turn; an enemy is slowed (EoT).'
						}),
						FactoryLogic.feature.createAbility({
							ability: FactoryLogic.createAbility({
								id: 'magisterium-hex-of-frailty',
								name: 'Hex of Frailty',
								description: 'Strength is a habit. You teach theirs to doubt itself.',
								type: FactoryLogic.type.createMain(),
								cost: 'signature',
								keywords: [ AbilityKeyword.Magic, AbilityKeyword.Ranged ],
								distance: [ FactoryLogic.distance.createRanged(10) ],
								target: 'One Creature',
								sections: [
									FactoryLogic.createAbilitySectionText('The target is slowed (EoT).'),
									FactoryLogic.createAbilitySectionSpend({
										value: 1,
										effect: 'The target is weakened (save ends).'
									})
								]
							})
						}),
						FactoryLogic.feature.createAbility({
							ability: FactoryLogic.createAbility({
								id: 'magisterium-warp',
								name: 'Warp',
								description: 'The limb that struck you forgets, briefly, how a limb is meant to bend.',
								type: FactoryLogic.type.createTrigger('An enemy within 10 hits you or an ally'),
								keywords: [ AbilityKeyword.Magic, AbilityKeyword.Ranged ],
								distance: [ FactoryLogic.distance.createRanged(10) ],
								target: 'One creature',
								sections: [
									FactoryLogic.createAbilitySectionText('The triggering enemy is slowed (save ends).')
								]
							})
						})
					]
				},
				{ level: 2, features: [ FactoryLogic.feature.createClassAbilityChoice({ id: 'magisterium-2-ability-3', cost: 3, fromSubclass: true, count: 1 }) ] },
				{ level: 5, features: [
					FactoryLogic.feature.create({
						id: 'magisterium-apex-form',
						name: 'Apex Form',
						description: 'As a maneuver, spend 5 Essence to transmute your body until the end of the encounter: you gain temporary Stamina equal to 3 x your Reason, +2 Speed, and a melee free strike that deals 2 + Reason damage. You can still cast while transformed; the Magisterium has no patience for the false divide between scholar and beast.'
					})
				] },
				{ level: 6, features: [ FactoryLogic.feature.createClassAbilityChoice({ id: 'magisterium-6-ability-7', cost: 7, fromSubclass: true, count: 1 }) ] },
				{ level: 7, features: [
					FactoryLogic.feature.create({
						id: 'magisterium-molten-form',
						name: 'Molten Form',
						description: 'Whenever you Overchannel, your body reshapes around the surge. Until the start of your next turn, choose one of the following - or two, if your Essence deficit is 3 or greater: your melee abilities gain reach 1; you gain a climb speed and a burrow speed and ignore difficult terrain; you gain resistance equal to your Reason to one damage type of your choice; the next ability you use this turn deals extra damage equal to your Essence deficit.'
					})
				] },
				{ level: 8, features: [
					FactoryLogic.feature.create({
						id: 'magisterium-second-clay',
						name: 'Second Clay',
						description: 'Once per encounter, as a maneuver, choose a creature within 10: an ally ends every condition on it and gains temporary Stamina equal to twice your Reason; an enemy is weakened and slowed (EoT; if winded, save ends).'
					})
				] },
				{ level: 9, features: [ FactoryLogic.feature.createClassAbilityChoice({ id: 'magisterium-9-ability-9', cost: 9, fromSubclass: true, count: 1 }) ] }
			],
			abilities: [
				FactoryLogic.createAbility({
					id: 'magisterium-encumber',
					name: 'Encumber',
					description: 'Lead in the marrow. The arm remembers it is heavy.',
					type: FactoryLogic.type.createManeuver(),
					keywords: [ AbilityKeyword.Magic, AbilityKeyword.Ranged ],
					distance: [ FactoryLogic.distance.createRanged(10) ],
					target: 'One or two creatures',
					cost: 3,
					sections: [
						FactoryLogic.createAbilitySectionRoll(
							FactoryLogic.createPowerRoll({
								characteristic: Characteristic.Reason,
								tier1: 'A < [weak] slowed (EoT)',
								tier2: 'A < [average] slowed (save ends)',
								tier3: 'A < [strong] slowed and weakened (save ends)'
							})
						),
						FactoryLogic.createAbilitySectionSpend({
							value: 1,
							effect: 'The target can\'t shift or stand from prone while slowed this way.'
						})
					]
				}),
				FactoryLogic.createAbility({
					id: 'magisterium-alter-flesh',
					name: 'Alter Flesh',
					description: 'The Shaper\'s smallest kindness: a body improved without being asked to become a monster.',
					type: FactoryLogic.type.createManeuver(),
					keywords: [ AbilityKeyword.Magic, AbilityKeyword.Ranged ],
					distance: [ FactoryLogic.distance.createRanged(10) ],
					target: 'One ally',
					cost: 3,
					sections: [
						FactoryLogic.createAbilitySectionText('Choose one, until the start of your next turn: •	The target gains +2 Speed and ignores difficult terrain. •	The target gains temporary Stamina equal to your Reason and immunity equal to your Reason to one damage type of your choice.'),
						FactoryLogic.createAbilitySectionSpend({
							value: 1,
							effect: 'Grant both benefits.'
						})
					]
				}),
				FactoryLogic.createAbility({
					id: 'magisterium-twist-the-form',
					name: 'Twist the Form',
					description: 'The Magisterium frowns on it, which has never once stopped a Shaper. A frog, usually.',
					type: FactoryLogic.type.createMain(),
					keywords: [ AbilityKeyword.Magic, AbilityKeyword.Ranged ],
					distance: [ FactoryLogic.distance.createRanged(10) ],
					target: 'One creature',
					cost: 5,
					sections: [
						FactoryLogic.createAbilitySectionRoll(
							FactoryLogic.createPowerRoll({
								characteristic: Characteristic.Reason,
								tier1: 'A < [weak] slowed (save ends)',
								tier2: 'A < [average] transformed (EoT)',
								tier3: 'A < [strong] transformed (save ends)'
							})
						),
						FactoryLogic.createAbilitySectionText('A transformed target becomes a harmless critter: it loses all abilities and can only move. This ability cannot target leaders, elites, or solos.')
					]
				}),
				FactoryLogic.createAbility({
					id: 'magisterium-reshape-the-field',
					name: 'Reshape the Field',
					description: 'The ground was only ever a first draft. You revise it.',
					type: FactoryLogic.type.createMain(),
					keywords: [ AbilityKeyword.Area, AbilityKeyword.Magic ],
					distance: [ FactoryLogic.distance.create({ type: AbilityDistanceType.Cube, value: 5, within: 10 }) ],
					target: 'The area',
					cost: 5,
					sections: [
						FactoryLogic.createAbilitySectionText('Until the end of the encounter, you can use a maneuver to do any of the following: •	Target a 5x1 line within 10 and either raise or lower it by one square •	Target a 5x1 line within 10 and make it difficult terrain •	Target a square within 10 and make it grasping ground: a creature that enters or starts its turn there is restrained (EoT) if it has A < [weak] .')
					]
				}),
				FactoryLogic.createAbility({
					id: 'magisterium-the-unseen-hand',
					name: 'The Unseen Hand',
					description: 'A hand the size of the room, and only you know quite where it is.',
					type: FactoryLogic.type.createMain(),
					keywords: [ AbilityKeyword.Magic, AbilityKeyword.Ranged, AbilityKeyword.Strike ],
					distance: [ FactoryLogic.distance.createRanged(10) ],
					target: 'One creature',
					cost: 7,
					sections: [
						FactoryLogic.createAbilitySectionRoll(FactoryLogic.createPowerRoll({
							characteristic: Characteristic.Reason,
							tier1: 'M<w restrained (save ends)',
							tier2: 'M<v suspended (save ends)',
							tier3: 'M<s suspended (save ends), slide 5'
						})),
						FactoryLogic.createAbilitySectionText('While the target is suspended it is restrained, and you can slide them 5 squares each turn as a Move Action.')
					]
				}),
				FactoryLogic.createAbility({
					id: 'magisterium-quickening',
					name: 'Quickening',
					description: 'You press a fistful of borrowed seconds into a friend\'s hand.',
					type: FactoryLogic.type.createManeuver(),
					keywords: [ AbilityKeyword.Magic, AbilityKeyword.Ranged ],
					distance: [ FactoryLogic.distance.createRanged(10) ],
					target: 'One ally',
					cost: 7,
					sections: [
						FactoryLogic.createAbilitySectionText('Until the start of your next turn, the target gains +3 Speed, can take an additional move action, and has an edge on their next power roll.')
					]
				}),
				FactoryLogic.createAbility({
					id: 'magisterium-apotheosis',
					name: 'Apotheosis',
					description: 'The Magisterium\'s heresy, spoken plainly: there is no fixed shape, only the one you have not changed yet.',
					type: FactoryLogic.type.createMain(),
					keywords: [ AbilityKeyword.Area, AbilityKeyword.Magic ],
					distance: [ FactoryLogic.distance.create({ type: AbilityDistanceType.Burst, value: 5 }) ],
					target: 'Each ally in the area',
					cost: 9,
					sections: [
						FactoryLogic.createAbilitySectionText('The target gains temporary Stamina equal to twice your Reason. Until the end of your next turn, the target gains +1 Speed, +1 Stability, and an edge on power rolls.'),
						FactoryLogic.createAbilitySectionField({
							name: 'Special',
							effect: 'On each of your turns, you can spend 3 essence as a maneuver to sustain this effect until the end of your following turn.'
						})
					]
				}),
				FactoryLogic.createAbility({
					id: 'magisterium-petrify',
					name: 'Petrify',
					description: 'The Magisterium calls it barbaric; the statue has never once filed a complaint.',
					type: FactoryLogic.type.createMain(),
					keywords: [ AbilityKeyword.Magic, AbilityKeyword.Ranged ],
					distance: [ FactoryLogic.distance.createRanged(10) ],
					target: 'One creature',
					cost: 9,
					sections: [
						FactoryLogic.createAbilitySectionRoll(
							FactoryLogic.createPowerRoll({
								characteristic: Characteristic.Reason,
								tier1: 'M<w restrained (EoT)',
								tier2: 'M<v suspended (save ends)',
								tier3: 'M<s suspended (save ends)'
							})
						),
						FactoryLogic.createAbilitySectionText('While restrained by this ability, a target that fails three saving throws can\'t take actions and is treated as an object. A leader, elite, or solo gains a +2 bonus to saving throws to end this effect.')
					]
				}),
				FactoryLogic.createAbility({
					id: 'magisterium-unmake-the-flesh',
					name: 'Unmake the Flesh',
					description: 'The Magisterium\'s forbidden verb, conjugated fully: to have been.',
					type: FactoryLogic.type.createMain(),
					keywords: [ AbilityKeyword.Magic, AbilityKeyword.Ranged, AbilityKeyword.Strike ],
					distance: [ FactoryLogic.distance.createRanged(10) ],
					target: 'One creature',
					cost: 11,
					sections: [
						FactoryLogic.createAbilitySectionRoll(FactoryLogic.createPowerRoll({
							characteristic: Characteristic.Reason,
							tier1: '10 + R corruption damage; weakened (save ends)',
							tier2: '15 + R corruption damage; weakened and slowed (save ends)',
							tier3: '20 + R corruption damage; weakened and slowed (save ends)'
						})),
						FactoryLogic.createAbilitySectionText('Damage from this ability ignores temporary Stamina.')
					]
				}),
				FactoryLogic.createAbility({
					id: 'magisterium-world-shaper',
					name: 'World-Shaper',
					description: 'You stop shaping things in the world, and start shaping the world at things.',
					type: FactoryLogic.type.createMain(),
					keywords: [ AbilityKeyword.Area, AbilityKeyword.Magic ],
					distance: [ FactoryLogic.distance.create({ type: AbilityDistanceType.Burst, value: 10 }) ],
					target: 'The area',
					cost: 11,
					sections: [
						FactoryLogic.createAbilitySectionText('The area is reshaped until the end of the encounter. Each enemy that enters the area or starts its turn there makes a Might test:'),
						FactoryLogic.createAbilitySectionText('11 or lower: restrained (EoT)  12-16: slowed (save ends)  17+: unaffected'),
						FactoryLogic.createAbilitySectionSpend({
							value: 2,
							effect: 'Each enemy that enters or starts its turn in the area takes damage equal to your Reason.'
						})
					]
				})
			],
			selected: false
		}
	],
	level: 1,
	characteristics: []
};

export const ageOfSecrets: Sourcebook = {
	id: 'community-age-of-secrets',
	name: 'Age of Secrets',
	description: 'Dickensian / Cold War / Conspiracy',
	type: SourcebookType.Community,
	adventures: [],
	ancestries: [],
	careers: [],
	classes: [
		thaumaturge
	],
	complications: [],
	cultures: [],
	domains: [],
	encounters: [],
	imbuements: [],
	items: [],
	kits: [],
	monsterGroups: [],
	montages: [],
	negotiations: [],
	perks: [],
	projects: [],
	subclasses: [],
	tacticalMaps: [],
	terrain: [],
	titles: [],
	skills: [],
	languages: []
};
