# == Schema Information
#
# Table name: text_channels
#
#  id         :bigint           not null, primary key
#  name       :string           not null
#  server_id  :integer          not null
#  created_at :datetime         not null
#  updated_at :datetime         not null
#
class TextChannel < ApplicationRecord

    validates :name, :server_id, presence: true

    belongs_to :server,
        primary_key: :id,
        foreign_key: :server_id,
        class_name: :Server

    has_many :messages, :as => :messageable

    
end
