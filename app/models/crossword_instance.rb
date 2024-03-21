class CrosswordInstance < ApplicationRecord
    validates :across, presence: true
    validates :down, presence: true
    validates :width, presence: true
    validates :height, presence: true
end
