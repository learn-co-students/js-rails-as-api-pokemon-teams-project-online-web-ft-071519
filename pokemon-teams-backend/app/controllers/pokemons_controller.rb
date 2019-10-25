class PokemonsController < ApplicationController

    def index
      pokemons = Pokemon.all
      render json: PokemonSerializer.new(pokemons)
    end

    def show
      pokemon = Pokemon.find(params[:id])
      render json: PokemonSerializer.new(pokemon)
    end

    def create
      Pokemon.create(pokemon_params)
    end
  
  private
  def pokemon_params
    params.permit(:nickname, :species, :trainer_id)
  end
end
