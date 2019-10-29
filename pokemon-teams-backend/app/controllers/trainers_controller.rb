class TrainersController < ApplicationController
    def index
        render json: Trainer.all, only: [:id, :name], include: {pokemons: {only: [:id, :species, :nickname]}}
    end
end
