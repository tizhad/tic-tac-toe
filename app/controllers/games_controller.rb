class GamesController < ApplicationController
  def index
    @game = Game.where(player1: params[:player_id]).
      or(Game.where(player2: params[:player_id])).
      and(Game.where(status: 'in-progress')).
      order(created_at: :desc).limit(1).first()
    if !@game
      render json:{
        status: 'no game'
      }
      return
    end

    render json: {
      id: @game.id,
      play_as: @game.player1 === params[:player_id].to_i ? 'X' : 'O',
      status: @game.status,
      board: @game.board,
      created_at: @game.created_at,
    }
  end

  def show
    @game = Game.find(params[:id])
    result = check_game_result(@game)
    if !@game
      render json:{
        status: 'no game'
      }
      return
    end

    render json: {
      id: @game.id,
      play_as: @game.player1 === params[:player_id].to_i ? 'X' : 'O',
      status: @game.status,
      board: @game.board,
      created_at: @game.created_at,
      result: result
    }
  end

  def create
    @game = Game.create(player1: params[:player1], player2: params[:player2], result: '', status: '', turn: '')
    render json: @game
  end


  def update
    game = Game.find(params[:id])
    game.board = params[:board]
    game.save
    result = check_game_result(game)
    if result >= 0
      game.status='ended'
      game.save
    end

    render json: {
      result: result,
      game: game
    }
  end

  def check_game_result(game)
    board = JSON.parse(game.board)
    # Check winning conditions
    for row in board do
      str = row.join("")
      if str == 'XXX'
        return 1
      elsif str == 'OOO'
        return 2
      end
    end

    for col in (0...board.length) do
      for cel in (0...board.length) do
        str += board[cel][col]
      end
      if str == 'XXX'
        return 1
      elsif str == 'OOO'
        return 2
      end
    end

    diagonal = board[0][0]+board[1][1]+board[2][2]
    if diagonal == 'XXX'
      return 1
    elsif diagonal == 'OOO'
      return 2
    end

    diagonal = board[0][2]+board[1][1]+board[2][0]
    if diagonal == 'XXX'
      return 1
    elsif diagonal == 'OOO'
      return 2
    end

    for i in (0...board.length)
      for j in (0...board.length)
        if board[i][j]=='E'
          return -1
        end
      end
    end
    return 0
    end

  end
