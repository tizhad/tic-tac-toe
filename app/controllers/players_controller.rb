class PlayersController < ApplicationController
  def index
    @players = Player.all
    render json: @players
  end

  def show
    @player = Player.find(params[:id])
    render json: @player
    sort
  end

  def create ()
    @player = Player.create(name: params[:name], status:'waiting')
    render json: @player
    match_making
  end

  def update ()
    
  end

  def match_making()
    game = Array.new()
    waitingList = Array.new(Player.where(:status => 'waiting'))
    waitingList.map do |player|
      if game.length < 2
      end
      game.push(player)
      if game.length === 2
        Game.create(player1: game[0].id, player2: game[1].id, result:'', status: 'in-progress', turn: 'X')
        Player.
        game = []
      end
    end
  end
end
