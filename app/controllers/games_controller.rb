class GamesController < ApplicationController
  def index
    @games = Game.all
    render json: @games
  end

  def show
    @game = Game.find(params[:id])
    render json: @game
  end

  def create
    puts 'calls game create'
    @game = Game.create(player1: params[:player1], player2: params[:player2], result:'', status: '', turn: '')
    render json: @game
  end

  def update
    @game = Game.find(params[:id])

    if @game.update_attributes(game_param)
      redirect_to :action => 'show', :id => @game
    else
      @subjects = Subject.all
      render :action => 'edit'
    end
    def game_param
      params.require(:game).permit(:turn, :result, :status)
    end

  end
end
