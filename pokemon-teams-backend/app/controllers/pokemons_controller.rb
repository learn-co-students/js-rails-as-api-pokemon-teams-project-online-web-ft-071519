class PokemonsController < ApplicationController
  #  resources :pokemons, except: [:edit, :update, :show]

  def create
    pokemon = Pokemon.new
    pokemon.nickname = Faker::Name.first_name
    pokemon.species = Faker::Games::Pokemon.name
    pokemon.trainer_id = params[:trainer_id]
    if !pokemon.save
      render json: { error: pokemon.errors.full_messages }
    else
      render json: PokemonSerializer.new(pokemon)
    end
  end

  def destroy
    pokemon = Pokemon.find(params[:id])
    if !pokemon.destroy
      render json: { error: pokemon.errors.full_messages }
    else
      render json: PokemonSerializer.new(pokemon)
    end
  end
end
