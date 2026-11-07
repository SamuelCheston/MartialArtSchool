export namespace gorm {
	
	export class DeletedAt {
	    // Go type: time
	    Time: any;
	    Valid: boolean;
	
	    static createFrom(source: any = {}) {
	        return new DeletedAt(source);
	    }
	
	    constructor(source: any = {}) {
	        if ('string' === typeof source) source = JSON.parse(source);
	        this.Time = this.convertValues(source["Time"], null);
	        this.Valid = source["Valid"];
	    }
	
		convertValues(a: any, classs: any, asMap: boolean = false): any {
		    if (!a) {
		        return a;
		    }
		    if (a.slice && a.map) {
		        return (a as any[]).map(elem => this.convertValues(elem, classs));
		    } else if ("object" === typeof a) {
		        if (asMap) {
		            for (const key of Object.keys(a)) {
		                a[key] = new classs(a[key]);
		            }
		            return a;
		        }
		        return new classs(a);
		    }
		    return a;
		}
	}

}

export namespace model {
	
	export class StoryEvent {
	    id: string;
	    category: string;
	    title: string;
	    description: string;
	    type: string;
	
	    static createFrom(source: any = {}) {
	        return new StoryEvent(source);
	    }
	
	    constructor(source: any = {}) {
	        if ('string' === typeof source) source = JSON.parse(source);
	        this.id = source["id"];
	        this.category = source["category"];
	        this.title = source["title"];
	        this.description = source["description"];
	        this.type = source["type"];
	    }
	}
	export class ActionResult {
	    executed: boolean;
	    message: string;
	
	    static createFrom(source: any = {}) {
	        return new ActionResult(source);
	    }
	
	    constructor(source: any = {}) {
	        if ('string' === typeof source) source = JSON.parse(source);
	        this.executed = source["executed"];
	        this.message = source["message"];
	    }
	}
	export class PlayerActionMeta {
	    id: string;
	    source: string;
	    event_id?: string;
	    label: string;
	    description: string;
	    group: string;
	    action_type: string;
	    target_type: string;
	    ap_cost: number;
	    duration_months: number;
	    enabled: boolean;
	    unavailable_behavior?: string;
	
	    static createFrom(source: any = {}) {
	        return new PlayerActionMeta(source);
	    }
	
	    constructor(source: any = {}) {
	        if ('string' === typeof source) source = JSON.parse(source);
	        this.id = source["id"];
	        this.source = source["source"];
	        this.event_id = source["event_id"];
	        this.label = source["label"];
	        this.description = source["description"];
	        this.group = source["group"];
	        this.action_type = source["action_type"];
	        this.target_type = source["target_type"];
	        this.ap_cost = source["ap_cost"];
	        this.duration_months = source["duration_months"];
	        this.enabled = source["enabled"];
	        this.unavailable_behavior = source["unavailable_behavior"];
	    }
	}
	export class AgentStats {
	    avg_connection: number;
	    prestige_base: number;
	    profession_factor: number;
	    trait_factor: number;
	    structural_prestige: number;
	    political_prestige: number;
	    ap_base_recovery: number;
	    ap_prestige_bonus: number;
	    ap_total_recovery: number;
	    ap_max: number;
	    propaganda_level: number;
	    propaganda_multiplier: number;
	    rebellion_base_effect: number;
	    is_faction_leader: boolean;
	
	    static createFrom(source: any = {}) {
	        return new AgentStats(source);
	    }
	
	    constructor(source: any = {}) {
	        if ('string' === typeof source) source = JSON.parse(source);
	        this.avg_connection = source["avg_connection"];
	        this.prestige_base = source["prestige_base"];
	        this.profession_factor = source["profession_factor"];
	        this.trait_factor = source["trait_factor"];
	        this.structural_prestige = source["structural_prestige"];
	        this.political_prestige = source["political_prestige"];
	        this.ap_base_recovery = source["ap_base_recovery"];
	        this.ap_prestige_bonus = source["ap_prestige_bonus"];
	        this.ap_total_recovery = source["ap_total_recovery"];
	        this.ap_max = source["ap_max"];
	        this.propaganda_level = source["propaganda_level"];
	        this.propaganda_multiplier = source["propaganda_multiplier"];
	        this.rebellion_base_effect = source["rebellion_base_effect"];
	        this.is_faction_leader = source["is_faction_leader"];
	    }
	}
	export class Connection {
	    id: number;
	    agent_id: number;
	    profession_id: number;
	    value: number;
	
	    static createFrom(source: any = {}) {
	        return new Connection(source);
	    }
	
	    constructor(source: any = {}) {
	        if ('string' === typeof source) source = JSON.parse(source);
	        this.id = source["id"];
	        this.agent_id = source["agent_id"];
	        this.profession_id = source["profession_id"];
	        this.value = source["value"];
	    }
	}
	export class Agent {
	    id: number;
	    user_id: number;
	    name: string;
	    profession: string;
	    traits: string[];
	    political_prestige: number;
	    political_points: number;
	    action_points: number;
	    propaganda_level: number;
	    suspicion_level: number;
	    connections: Connection[];
	    known_fragments: string[];
	    relics?: Relic[];
	    // Go type: time
	    created_at: any;
	    // Go type: time
	    updated_at: any;
	
	    static createFrom(source: any = {}) {
	        return new Agent(source);
	    }
	
	    constructor(source: any = {}) {
	        if ('string' === typeof source) source = JSON.parse(source);
	        this.id = source["id"];
	        this.user_id = source["user_id"];
	        this.name = source["name"];
	        this.profession = source["profession"];
	        this.traits = source["traits"];
	        this.political_prestige = source["political_prestige"];
	        this.political_points = source["political_points"];
	        this.action_points = source["action_points"];
	        this.propaganda_level = source["propaganda_level"];
	        this.suspicion_level = source["suspicion_level"];
	        this.connections = this.convertValues(source["connections"], Connection);
	        this.known_fragments = source["known_fragments"];
	        this.relics = this.convertValues(source["relics"], Relic);
	        this.created_at = this.convertValues(source["created_at"], null);
	        this.updated_at = this.convertValues(source["updated_at"], null);
	    }
	
		convertValues(a: any, classs: any, asMap: boolean = false): any {
		    if (!a) {
		        return a;
		    }
		    if (a.slice && a.map) {
		        return (a as any[]).map(elem => this.convertValues(elem, classs));
		    } else if ("object" === typeof a) {
		        if (asMap) {
		            for (const key of Object.keys(a)) {
		                a[key] = new classs(a[key]);
		            }
		            return a;
		        }
		        return new classs(a);
		    }
		    return a;
		}
	}
	export class Faction {
	    id: number;
	    silo_id: number;
	    name: string;
	    signature: string;
	    tags: string[];
	    tag_stats?: Record<string, number>;
	    member_count: number;
	    representative_resident_id: number;
	    representative_cohort_id?: number;
	    representative_name: string;
	    influence: number;
	    cohesion: number;
	    prestige: number;
	    is_public: boolean;
	    // Go type: time
	    updated_at: any;
	
	    static createFrom(source: any = {}) {
	        return new Faction(source);
	    }
	
	    constructor(source: any = {}) {
	        if ('string' === typeof source) source = JSON.parse(source);
	        this.id = source["id"];
	        this.silo_id = source["silo_id"];
	        this.name = source["name"];
	        this.signature = source["signature"];
	        this.tags = source["tags"];
	        this.tag_stats = source["tag_stats"];
	        this.member_count = source["member_count"];
	        this.representative_resident_id = source["representative_resident_id"];
	        this.representative_cohort_id = source["representative_cohort_id"];
	        this.representative_name = source["representative_name"];
	        this.influence = source["influence"];
	        this.cohesion = source["cohesion"];
	        this.prestige = source["prestige"];
	        this.is_public = source["is_public"];
	        this.updated_at = this.convertValues(source["updated_at"], null);
	    }
	
		convertValues(a: any, classs: any, asMap: boolean = false): any {
		    if (!a) {
		        return a;
		    }
		    if (a.slice && a.map) {
		        return (a as any[]).map(elem => this.convertValues(elem, classs));
		    } else if ("object" === typeof a) {
		        if (asMap) {
		            for (const key of Object.keys(a)) {
		                a[key] = new classs(a[key]);
		            }
		            return a;
		        }
		        return new classs(a);
		    }
		    return a;
		}
	}
	export class Resident {
	    id: number;
	    silo_id: number;
	    name: string;
	    cohort_id?: number;
	    profession_id: number;
	    profession: string;
	    faction_id?: number;
	    home_floor: number;
	    tags: string[];
	    loyalty: number;
	    ambition: number;
	    ideologies: Record<string, number>;
	    influence: number;
	    action_points: number;
	    suspicion_level: number;
	    political_prestige: number;
	    propaganda_level: number;
	    known_fragments: string[];
	    relations?: Record<string, number>;
	    is_representative: boolean;
	    alive: boolean;
	    // Go type: time
	    updated_at: any;
	
	    static createFrom(source: any = {}) {
	        return new Resident(source);
	    }
	
	    constructor(source: any = {}) {
	        if ('string' === typeof source) source = JSON.parse(source);
	        this.id = source["id"];
	        this.silo_id = source["silo_id"];
	        this.name = source["name"];
	        this.cohort_id = source["cohort_id"];
	        this.profession_id = source["profession_id"];
	        this.profession = source["profession"];
	        this.faction_id = source["faction_id"];
	        this.home_floor = source["home_floor"];
	        this.tags = source["tags"];
	        this.loyalty = source["loyalty"];
	        this.ambition = source["ambition"];
	        this.ideologies = source["ideologies"];
	        this.influence = source["influence"];
	        this.action_points = source["action_points"];
	        this.suspicion_level = source["suspicion_level"];
	        this.political_prestige = source["political_prestige"];
	        this.propaganda_level = source["propaganda_level"];
	        this.known_fragments = source["known_fragments"];
	        this.relations = source["relations"];
	        this.is_representative = source["is_representative"];
	        this.alive = source["alive"];
	        this.updated_at = this.convertValues(source["updated_at"], null);
	    }
	
		convertValues(a: any, classs: any, asMap: boolean = false): any {
		    if (!a) {
		        return a;
		    }
		    if (a.slice && a.map) {
		        return (a as any[]).map(elem => this.convertValues(elem, classs));
		    } else if ("object" === typeof a) {
		        if (asMap) {
		            for (const key of Object.keys(a)) {
		                a[key] = new classs(a[key]);
		            }
		            return a;
		        }
		        return new classs(a);
		    }
		    return a;
		}
	}
	export class PopulationCohort {
	    id: number;
	    silo_id: number;
	    profession_id: number;
	    faction_id?: number;
	    name: string;
	    count: number;
	    ideology_profile: string[];
	    home_zone: string;
	    loyalty: number;
	    influence: number;
	    action_points: number;
	    political_prestige: number;
	    panic_sensitivity: number;
	    ideologies: Record<string, number>;
	    known_fragments?: string[];
	    tags?: string[];
	    // Go type: time
	    updated_at: any;
	
	    static createFrom(source: any = {}) {
	        return new PopulationCohort(source);
	    }
	
	    constructor(source: any = {}) {
	        if ('string' === typeof source) source = JSON.parse(source);
	        this.id = source["id"];
	        this.silo_id = source["silo_id"];
	        this.profession_id = source["profession_id"];
	        this.faction_id = source["faction_id"];
	        this.name = source["name"];
	        this.count = source["count"];
	        this.ideology_profile = source["ideology_profile"];
	        this.home_zone = source["home_zone"];
	        this.loyalty = source["loyalty"];
	        this.influence = source["influence"];
	        this.action_points = source["action_points"];
	        this.political_prestige = source["political_prestige"];
	        this.panic_sensitivity = source["panic_sensitivity"];
	        this.ideologies = source["ideologies"];
	        this.known_fragments = source["known_fragments"];
	        this.tags = source["tags"];
	        this.updated_at = this.convertValues(source["updated_at"], null);
	    }
	
		convertValues(a: any, classs: any, asMap: boolean = false): any {
		    if (!a) {
		        return a;
		    }
		    if (a.slice && a.map) {
		        return (a as any[]).map(elem => this.convertValues(elem, classs));
		    } else if ("object" === typeof a) {
		        if (asMap) {
		            for (const key of Object.keys(a)) {
		                a[key] = new classs(a[key]);
		            }
		            return a;
		        }
		        return new classs(a);
		    }
		    return a;
		}
	}
	export class Floor {
	    id: number;
	    silo_id: number;
	    level: number;
	    function: string;
	    zone: string;
	    stability: number;
	    population: number;
	    // Go type: time
	    updated_at: any;
	
	    static createFrom(source: any = {}) {
	        return new Floor(source);
	    }
	
	    constructor(source: any = {}) {
	        if ('string' === typeof source) source = JSON.parse(source);
	        this.id = source["id"];
	        this.silo_id = source["silo_id"];
	        this.level = source["level"];
	        this.function = source["function"];
	        this.zone = source["zone"];
	        this.stability = source["stability"];
	        this.population = source["population"];
	        this.updated_at = this.convertValues(source["updated_at"], null);
	    }
	
		convertValues(a: any, classs: any, asMap: boolean = false): any {
		    if (!a) {
		        return a;
		    }
		    if (a.slice && a.map) {
		        return (a as any[]).map(elem => this.convertValues(elem, classs));
		    } else if ("object" === typeof a) {
		        if (asMap) {
		            for (const key of Object.keys(a)) {
		                a[key] = new classs(a[key]);
		            }
		            return a;
		        }
		        return new classs(a);
		    }
		    return a;
		}
	}
	export class Relic {
	    id: number;
	    silo_id: number;
	    name: string;
	    description: string;
	    source_dept: string;
	    discovery_year: number;
	    effects: Record<string, number>;
	    agent_id?: number;
	    profession_id?: number;
	    // Go type: time
	    created_at: any;
	    // Go type: time
	    updated_at: any;
	
	    static createFrom(source: any = {}) {
	        return new Relic(source);
	    }
	
	    constructor(source: any = {}) {
	        if ('string' === typeof source) source = JSON.parse(source);
	        this.id = source["id"];
	        this.silo_id = source["silo_id"];
	        this.name = source["name"];
	        this.description = source["description"];
	        this.source_dept = source["source_dept"];
	        this.discovery_year = source["discovery_year"];
	        this.effects = source["effects"];
	        this.agent_id = source["agent_id"];
	        this.profession_id = source["profession_id"];
	        this.created_at = this.convertValues(source["created_at"], null);
	        this.updated_at = this.convertValues(source["updated_at"], null);
	    }
	
		convertValues(a: any, classs: any, asMap: boolean = false): any {
		    if (!a) {
		        return a;
		    }
		    if (a.slice && a.map) {
		        return (a as any[]).map(elem => this.convertValues(elem, classs));
		    } else if ("object" === typeof a) {
		        if (asMap) {
		            for (const key of Object.keys(a)) {
		                a[key] = new classs(a[key]);
		            }
		            return a;
		        }
		        return new classs(a);
		    }
		    return a;
		}
	}
	export class Profession {
	    id: number;
	    silo_id: number;
	    name: string;
	    class_type: string;
	    population: number;
	    ideologies: Record<string, number>;
	    panic_value: number;
	    productivity: number;
	    power_level: number;
	    zone: string;
	    known_fragments: string[];
	    relations?: Record<string, number>;
	    action_points: number;
	    suspicion_level: number;
	    political_prestige: number;
	    propaganda_level: number;
	    traits?: string[];
	    relics?: Relic[];
	    // Go type: time
	    updated_at: any;
	
	    static createFrom(source: any = {}) {
	        return new Profession(source);
	    }
	
	    constructor(source: any = {}) {
	        if ('string' === typeof source) source = JSON.parse(source);
	        this.id = source["id"];
	        this.silo_id = source["silo_id"];
	        this.name = source["name"];
	        this.class_type = source["class_type"];
	        this.population = source["population"];
	        this.ideologies = source["ideologies"];
	        this.panic_value = source["panic_value"];
	        this.productivity = source["productivity"];
	        this.power_level = source["power_level"];
	        this.zone = source["zone"];
	        this.known_fragments = source["known_fragments"];
	        this.relations = source["relations"];
	        this.action_points = source["action_points"];
	        this.suspicion_level = source["suspicion_level"];
	        this.political_prestige = source["political_prestige"];
	        this.propaganda_level = source["propaganda_level"];
	        this.traits = source["traits"];
	        this.relics = this.convertValues(source["relics"], Relic);
	        this.updated_at = this.convertValues(source["updated_at"], null);
	    }
	
		convertValues(a: any, classs: any, asMap: boolean = false): any {
		    if (!a) {
		        return a;
		    }
		    if (a.slice && a.map) {
		        return (a as any[]).map(elem => this.convertValues(elem, classs));
		    } else if ("object" === typeof a) {
		        if (asMap) {
		            for (const key of Object.keys(a)) {
		                a[key] = new classs(a[key]);
		            }
		            return a;
		        }
		        return new classs(a);
		    }
		    return a;
		}
	}
	export class Resource {
	    id: number;
	    silo_id: number;
	    type: string;
	    amount: number;
	    net_balance: number;
	    // Go type: time
	    updated_at: any;
	
	    static createFrom(source: any = {}) {
	        return new Resource(source);
	    }
	
	    constructor(source: any = {}) {
	        if ('string' === typeof source) source = JSON.parse(source);
	        this.id = source["id"];
	        this.silo_id = source["silo_id"];
	        this.type = source["type"];
	        this.amount = source["amount"];
	        this.net_balance = source["net_balance"];
	        this.updated_at = this.convertValues(source["updated_at"], null);
	    }
	
		convertValues(a: any, classs: any, asMap: boolean = false): any {
		    if (!a) {
		        return a;
		    }
		    if (a.slice && a.map) {
		        return (a as any[]).map(elem => this.convertValues(elem, classs));
		    } else if ("object" === typeof a) {
		        if (asMap) {
		            for (const key of Object.keys(a)) {
		                a[key] = new classs(a[key]);
		            }
		            return a;
		        }
		        return new classs(a);
		    }
		    return a;
		}
	}
	export class GameScore {
	    total: number;
	    survival_points: number;
	    diversity_points: number;
	    heritage_points: number;
	    ideology_points: number;
	    multiplier: number;
	
	    static createFrom(source: any = {}) {
	        return new GameScore(source);
	    }
	
	    constructor(source: any = {}) {
	        if ('string' === typeof source) source = JSON.parse(source);
	        this.total = source["total"];
	        this.survival_points = source["survival_points"];
	        this.diversity_points = source["diversity_points"];
	        this.heritage_points = source["heritage_points"];
	        this.ideology_points = source["ideology_points"];
	        this.multiplier = source["multiplier"];
	    }
	}
	export class VictoryStatus {
	    is_won: boolean;
	    type: string;
	    description: string;
	    score?: GameScore;
	
	    static createFrom(source: any = {}) {
	        return new VictoryStatus(source);
	    }
	
	    constructor(source: any = {}) {
	        if ('string' === typeof source) source = JSON.parse(source);
	        this.is_won = source["is_won"];
	        this.type = source["type"];
	        this.description = source["description"];
	        this.score = this.convertValues(source["score"], GameScore);
	    }
	
		convertValues(a: any, classs: any, asMap: boolean = false): any {
		    if (!a) {
		        return a;
		    }
		    if (a.slice && a.map) {
		        return (a as any[]).map(elem => this.convertValues(elem, classs));
		    } else if ("object" === typeof a) {
		        if (asMap) {
		            for (const key of Object.keys(a)) {
		                a[key] = new classs(a[key]);
		            }
		            return a;
		        }
		        return new classs(a);
		    }
		    return a;
		}
	}
	export class Silo {
	    id: number;
	    name: string;
	    traits: string[];
	    safeguard_risk: number;
	    total_population: number;
	    legitimacy: number;
	    cohesion: number;
	    rebellion: number;
	    dept_tension: number;
	    class_fragmentation: number;
	    history_burden: number;
	    event_trigger: number;
	    current_year: number;
	    current_month: number;
	    countdown: number;
	    silo1_destroyed: boolean;
	    victory_status?: VictoryStatus;
	    resources: Resource[];
	    professions: Profession[];
	    floors: Floor[];
	    cohorts?: PopulationCohort[];
	    residents?: Resident[];
	    factions?: Faction[];
	    relics?: Relic[];
	    // Go type: time
	    created_at: any;
	    // Go type: time
	    updated_at: any;
	
	    static createFrom(source: any = {}) {
	        return new Silo(source);
	    }
	
	    constructor(source: any = {}) {
	        if ('string' === typeof source) source = JSON.parse(source);
	        this.id = source["id"];
	        this.name = source["name"];
	        this.traits = source["traits"];
	        this.safeguard_risk = source["safeguard_risk"];
	        this.total_population = source["total_population"];
	        this.legitimacy = source["legitimacy"];
	        this.cohesion = source["cohesion"];
	        this.rebellion = source["rebellion"];
	        this.dept_tension = source["dept_tension"];
	        this.class_fragmentation = source["class_fragmentation"];
	        this.history_burden = source["history_burden"];
	        this.event_trigger = source["event_trigger"];
	        this.current_year = source["current_year"];
	        this.current_month = source["current_month"];
	        this.countdown = source["countdown"];
	        this.silo1_destroyed = source["silo1_destroyed"];
	        this.victory_status = this.convertValues(source["victory_status"], VictoryStatus);
	        this.resources = this.convertValues(source["resources"], Resource);
	        this.professions = this.convertValues(source["professions"], Profession);
	        this.floors = this.convertValues(source["floors"], Floor);
	        this.cohorts = this.convertValues(source["cohorts"], PopulationCohort);
	        this.residents = this.convertValues(source["residents"], Resident);
	        this.factions = this.convertValues(source["factions"], Faction);
	        this.relics = this.convertValues(source["relics"], Relic);
	        this.created_at = this.convertValues(source["created_at"], null);
	        this.updated_at = this.convertValues(source["updated_at"], null);
	    }
	
		convertValues(a: any, classs: any, asMap: boolean = false): any {
		    if (!a) {
		        return a;
		    }
		    if (a.slice && a.map) {
		        return (a as any[]).map(elem => this.convertValues(elem, classs));
		    } else if ("object" === typeof a) {
		        if (asMap) {
		            for (const key of Object.keys(a)) {
		                a[key] = new classs(a[key]);
		            }
		            return a;
		        }
		        return new classs(a);
		    }
		    return a;
		}
	}
	export class ActionOutcome {
	    silo: Silo;
	    agent: Agent;
	    agent_stats: AgentStats;
	    available_actions?: PlayerActionMeta[];
	    result: ActionResult;
	    logs: string[];
	    stories: StoryEvent[];
	    game_over: boolean;
	    ending_narrative?: string;
	
	    static createFrom(source: any = {}) {
	        return new ActionOutcome(source);
	    }
	
	    constructor(source: any = {}) {
	        if ('string' === typeof source) source = JSON.parse(source);
	        this.silo = this.convertValues(source["silo"], Silo);
	        this.agent = this.convertValues(source["agent"], Agent);
	        this.agent_stats = this.convertValues(source["agent_stats"], AgentStats);
	        this.available_actions = this.convertValues(source["available_actions"], PlayerActionMeta);
	        this.result = this.convertValues(source["result"], ActionResult);
	        this.logs = source["logs"];
	        this.stories = this.convertValues(source["stories"], StoryEvent);
	        this.game_over = source["game_over"];
	        this.ending_narrative = source["ending_narrative"];
	    }
	
		convertValues(a: any, classs: any, asMap: boolean = false): any {
		    if (!a) {
		        return a;
		    }
		    if (a.slice && a.map) {
		        return (a as any[]).map(elem => this.convertValues(elem, classs));
		    } else if ("object" === typeof a) {
		        if (asMap) {
		            for (const key of Object.keys(a)) {
		                a[key] = new classs(a[key]);
		            }
		            return a;
		        }
		        return new classs(a);
		    }
		    return a;
		}
	}
	
	
	export class AgentAction {
	    type: string;
	    action_id?: string;
	    target_dept?: string;
	    fragment_ids?: string[];
	    profession_action?: string;
	    resource_target?: string;
	    cost: number;
	
	    static createFrom(source: any = {}) {
	        return new AgentAction(source);
	    }
	
	    constructor(source: any = {}) {
	        if ('string' === typeof source) source = JSON.parse(source);
	        this.type = source["type"];
	        this.action_id = source["action_id"];
	        this.target_dept = source["target_dept"];
	        this.fragment_ids = source["fragment_ids"];
	        this.profession_action = source["profession_action"];
	        this.resource_target = source["resource_target"];
	        this.cost = source["cost"];
	    }
	}
	
	
	export class CreateGameRequest {
	    silo_name: string;
	    start_year: number;
	    trait_ids: string[];
	    agent_name: string;
	    profession: string;
	
	    static createFrom(source: any = {}) {
	        return new CreateGameRequest(source);
	    }
	
	    constructor(source: any = {}) {
	        if ('string' === typeof source) source = JSON.parse(source);
	        this.silo_name = source["silo_name"];
	        this.start_year = source["start_year"];
	        this.trait_ids = source["trait_ids"];
	        this.agent_name = source["agent_name"];
	        this.profession = source["profession"];
	    }
	}
	export class StoryEventLog {
	    id: number;
	    silo_id: number;
	    timestamp: number;
	    year: number;
	    month: number;
	    source: string;
	    event_id: string;
	    category: string;
	    title: string;
	    description: string;
	    type: string;
	    // Go type: time
	    created_at: any;
	    // Go type: time
	    updated_at: any;
	
	    static createFrom(source: any = {}) {
	        return new StoryEventLog(source);
	    }
	
	    constructor(source: any = {}) {
	        if ('string' === typeof source) source = JSON.parse(source);
	        this.id = source["id"];
	        this.silo_id = source["silo_id"];
	        this.timestamp = source["timestamp"];
	        this.year = source["year"];
	        this.month = source["month"];
	        this.source = source["source"];
	        this.event_id = source["event_id"];
	        this.category = source["category"];
	        this.title = source["title"];
	        this.description = source["description"];
	        this.type = source["type"];
	        this.created_at = this.convertValues(source["created_at"], null);
	        this.updated_at = this.convertValues(source["updated_at"], null);
	    }
	
		convertValues(a: any, classs: any, asMap: boolean = false): any {
		    if (!a) {
		        return a;
		    }
		    if (a.slice && a.map) {
		        return (a as any[]).map(elem => this.convertValues(elem, classs));
		    } else if ("object" === typeof a) {
		        if (asMap) {
		            for (const key of Object.keys(a)) {
		                a[key] = new classs(a[key]);
		            }
		            return a;
		        }
		        return new classs(a);
		    }
		    return a;
		}
	}
	export class EventHistoryResult {
	    events: StoryEventLog[];
	
	    static createFrom(source: any = {}) {
	        return new EventHistoryResult(source);
	    }
	
	    constructor(source: any = {}) {
	        if ('string' === typeof source) source = JSON.parse(source);
	        this.events = this.convertValues(source["events"], StoryEventLog);
	    }
	
		convertValues(a: any, classs: any, asMap: boolean = false): any {
		    if (!a) {
		        return a;
		    }
		    if (a.slice && a.map) {
		        return (a as any[]).map(elem => this.convertValues(elem, classs));
		    } else if ("object" === typeof a) {
		        if (asMap) {
		            for (const key of Object.keys(a)) {
		                a[key] = new classs(a[key]);
		            }
		            return a;
		        }
		        return new classs(a);
		    }
		    return a;
		}
	}
	export class EventQueueState {
	    silo: Silo;
	    agent: Agent;
	    agent_stats: AgentStats;
	    available_actions?: PlayerActionMeta[];
	    game_over: boolean;
	    ending_narrative?: string;
	    pending_events: number;
	    pending_operation?: string;
	
	    static createFrom(source: any = {}) {
	        return new EventQueueState(source);
	    }
	
	    constructor(source: any = {}) {
	        if ('string' === typeof source) source = JSON.parse(source);
	        this.silo = this.convertValues(source["silo"], Silo);
	        this.agent = this.convertValues(source["agent"], Agent);
	        this.agent_stats = this.convertValues(source["agent_stats"], AgentStats);
	        this.available_actions = this.convertValues(source["available_actions"], PlayerActionMeta);
	        this.game_over = source["game_over"];
	        this.ending_narrative = source["ending_narrative"];
	        this.pending_events = source["pending_events"];
	        this.pending_operation = source["pending_operation"];
	    }
	
		convertValues(a: any, classs: any, asMap: boolean = false): any {
		    if (!a) {
		        return a;
		    }
		    if (a.slice && a.map) {
		        return (a as any[]).map(elem => this.convertValues(elem, classs));
		    } else if ("object" === typeof a) {
		        if (asMap) {
		            for (const key of Object.keys(a)) {
		                a[key] = new classs(a[key]);
		            }
		            return a;
		        }
		        return new classs(a);
		    }
		    return a;
		}
	}
	export class EventStepResult {
	    silo: Silo;
	    agent: Agent;
	    agent_stats: AgentStats;
	    available_actions?: PlayerActionMeta[];
	    game_over: boolean;
	    ending_narrative?: string;
	    pending_events: number;
	    pending_operation?: string;
	    processed_event_id?: string;
	    processed_event_type?: string;
	    operation_complete: boolean;
	    logs?: string[];
	    stories?: StoryEvent[];
	    action_result?: ActionResult;
	
	    static createFrom(source: any = {}) {
	        return new EventStepResult(source);
	    }
	
	    constructor(source: any = {}) {
	        if ('string' === typeof source) source = JSON.parse(source);
	        this.silo = this.convertValues(source["silo"], Silo);
	        this.agent = this.convertValues(source["agent"], Agent);
	        this.agent_stats = this.convertValues(source["agent_stats"], AgentStats);
	        this.available_actions = this.convertValues(source["available_actions"], PlayerActionMeta);
	        this.game_over = source["game_over"];
	        this.ending_narrative = source["ending_narrative"];
	        this.pending_events = source["pending_events"];
	        this.pending_operation = source["pending_operation"];
	        this.processed_event_id = source["processed_event_id"];
	        this.processed_event_type = source["processed_event_type"];
	        this.operation_complete = source["operation_complete"];
	        this.logs = source["logs"];
	        this.stories = this.convertValues(source["stories"], StoryEvent);
	        this.action_result = this.convertValues(source["action_result"], ActionResult);
	    }
	
		convertValues(a: any, classs: any, asMap: boolean = false): any {
		    if (!a) {
		        return a;
		    }
		    if (a.slice && a.map) {
		        return (a as any[]).map(elem => this.convertValues(elem, classs));
		    } else if ("object" === typeof a) {
		        if (asMap) {
		            for (const key of Object.keys(a)) {
		                a[key] = new classs(a[key]);
		            }
		            return a;
		        }
		        return new classs(a);
		    }
		    return a;
		}
	}
	
	
	
	export class ProfessionActionMeta {
	    id: string;
	    profession: string;
	    label: string;
	    description: string;
	    ap_cost: number;
	    target_type: string;
	    suspicion_penalty: number;
	
	    static createFrom(source: any = {}) {
	        return new ProfessionActionMeta(source);
	    }
	
	    constructor(source: any = {}) {
	        if ('string' === typeof source) source = JSON.parse(source);
	        this.id = source["id"];
	        this.profession = source["profession"];
	        this.label = source["label"];
	        this.description = source["description"];
	        this.ap_cost = source["ap_cost"];
	        this.target_type = source["target_type"];
	        this.suspicion_penalty = source["suspicion_penalty"];
	    }
	}
	export class GameState {
	    silo: Silo;
	    agent: Agent;
	    agent_stats: AgentStats;
	    game_over: boolean;
	    ending_narrative?: string;
	    victory_status?: VictoryStatus;
	    profession_actions?: ProfessionActionMeta[];
	    available_actions?: PlayerActionMeta[];
	
	    static createFrom(source: any = {}) {
	        return new GameState(source);
	    }
	
	    constructor(source: any = {}) {
	        if ('string' === typeof source) source = JSON.parse(source);
	        this.silo = this.convertValues(source["silo"], Silo);
	        this.agent = this.convertValues(source["agent"], Agent);
	        this.agent_stats = this.convertValues(source["agent_stats"], AgentStats);
	        this.game_over = source["game_over"];
	        this.ending_narrative = source["ending_narrative"];
	        this.victory_status = this.convertValues(source["victory_status"], VictoryStatus);
	        this.profession_actions = this.convertValues(source["profession_actions"], ProfessionActionMeta);
	        this.available_actions = this.convertValues(source["available_actions"], PlayerActionMeta);
	    }
	
		convertValues(a: any, classs: any, asMap: boolean = false): any {
		    if (!a) {
		        return a;
		    }
		    if (a.slice && a.map) {
		        return (a as any[]).map(elem => this.convertValues(elem, classs));
		    } else if ("object" === typeof a) {
		        if (asMap) {
		            for (const key of Object.keys(a)) {
		                a[key] = new classs(a[key]);
		            }
		            return a;
		        }
		        return new classs(a);
		    }
		    return a;
		}
	}
	
	
	
	
	
	
	
	
	
	
	export class TickResult {
	    silo: Silo;
	    agent: Agent;
	    agent_stats: AgentStats;
	    available_actions?: PlayerActionMeta[];
	    logs: string[];
	    stories: StoryEvent[];
	    game_over: boolean;
	    ending_narrative?: string;
	
	    static createFrom(source: any = {}) {
	        return new TickResult(source);
	    }
	
	    constructor(source: any = {}) {
	        if ('string' === typeof source) source = JSON.parse(source);
	        this.silo = this.convertValues(source["silo"], Silo);
	        this.agent = this.convertValues(source["agent"], Agent);
	        this.agent_stats = this.convertValues(source["agent_stats"], AgentStats);
	        this.available_actions = this.convertValues(source["available_actions"], PlayerActionMeta);
	        this.logs = source["logs"];
	        this.stories = this.convertValues(source["stories"], StoryEvent);
	        this.game_over = source["game_over"];
	        this.ending_narrative = source["ending_narrative"];
	    }
	
		convertValues(a: any, classs: any, asMap: boolean = false): any {
		    if (!a) {
		        return a;
		    }
		    if (a.slice && a.map) {
		        return (a as any[]).map(elem => this.convertValues(elem, classs));
		    } else if ("object" === typeof a) {
		        if (asMap) {
		            for (const key of Object.keys(a)) {
		                a[key] = new classs(a[key]);
		            }
		            return a;
		        }
		        return new classs(a);
		    }
		    return a;
		}
	}

}

