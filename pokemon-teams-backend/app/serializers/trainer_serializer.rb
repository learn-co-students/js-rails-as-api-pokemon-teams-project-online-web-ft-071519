class TrainerSerializer
  include FastJsonapi::ObjectSerializer
  attributes :name, :id, :pokemons
  has_many :pokemons
end
