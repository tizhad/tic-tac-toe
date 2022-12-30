class PlayersController < ApplicationController
  def index
    @players = Player.all
    render json: @players
  end

  def show
    @player = Player.find(params[:id])
    render json: @player
  end

  def create ()
    @player = Player.create(name: params[:name], status: 'waiting')
    match_making
    render json: @player
  end

  def update ()
  end

  def match_making()
    players = Player.where(:status => 'waiting').order(updated_at: :asc)
    pairs = players.each_slice(2).to_a
    pairs.each do |pair|
      if pair.length == 2
        Game.create(
          player1: players[0].id,
          player2: players[1].id,
          board: [['E','E','E'],['E','E','E'],['E','E','E']].to_json,
          result: '', status: 'in-progress', turn: players[0].id)
        players.update(status: 'playing')
      end
    end
  end
end
