class Api::V1::CrosswordInstancesController < ApplicationController
  before_action :set_crossword, only: %i[show destroy]

  def index
    crossword = CrosswordInstance.all.order(created_at: :desc)
    render json: crossword
  end

  def random
    crosswords = CrosswordInstance.order('RANDOM()').limit(1)
    if crosswords.empty?
      render json: {}
    else
      render json: crosswords[0]
    end
  end

  def create
    crossword = CrosswordInstance.create!(crossword_params)
    if crossword
      render json: crossword
    else
      render json: crossword.errors
    end
  end

  def show
    render json: @crossword
  end

  def destroy
    @crossword&.destroy
    render json: { message: 'Crossword deleted!' }
  end

  private

  def crossword_params
    params.permit(:across, :down, :width, :height)
  end

  def set_crossword
    @crossword = CrosswordInstance.find(params[:id])
  end
end
