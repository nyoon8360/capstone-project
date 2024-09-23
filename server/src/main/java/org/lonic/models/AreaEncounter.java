package org.lonic.models;

public class AreaEncounter {
    private int areaId;
    private String pokemonName;
    private int encounterRate;
    private int flee_rate;

    public int getAreaId() {
        return areaId;
    }

    public void setAreaId(int areaId) {
        this.areaId = areaId;
    }

    public String getPokemonName() {
        return pokemonName;
    }

    public void setPokemonName(String pokemonName) {
        this.pokemonName = pokemonName;
    }

    public int getEncounterRate() {
        return encounterRate;
    }

    public void setEncounterRate(int encounterRate) {
        this.encounterRate = encounterRate;
    }

    public int getFlee_rate() {
        return flee_rate;
    }

    public void setFlee_rate(int flee_rate) {
        this.flee_rate = flee_rate;
    }
}
