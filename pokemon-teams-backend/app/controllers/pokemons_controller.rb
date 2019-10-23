require 'faker'
require 'securerandom'

class PokemonsController < ApplicationController
    def destroy
        pokemon = Pokemon.find(params[:id])
        pokemon.destroy
        render json: Trainer.all, only: [:id, :name], include: {pokemons: {only: [:id, :species, :nickname]}}
   end

   def create
   
    if Trainer.find(params[:trainer_id]).pokemons.count < 6
        p=Pokemon.create(nickname: Faker::Name.first_name,species: Faker::Games::Pokemon.name, trainer_id: params[:trainer_id])
        render json: Trainer.all, only: [:id, :name], include: {pokemons: {only: [:id, :species, :nickname]}}  
    end
   end
end
