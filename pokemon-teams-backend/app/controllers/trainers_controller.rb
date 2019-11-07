class TrainersController < ApplicationController
  # resources :trainers, only: [:index]
  def index
    trainers = Trainer.all
    options = {
        include: [:pokemon]
    }
    render json: TrainerSerializer.new(trainers, options)
  end
end
