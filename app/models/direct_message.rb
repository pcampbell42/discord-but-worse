# == Schema Information
#
# Table name: direct_messages
#
#  id         :bigint           not null, primary key
#  user1_id   :integer          not null
#  user2_id   :integer          not null
#  created_at :datetime         not null
#  updated_at :datetime         not null
#
class DirectMessage < ApplicationRecord

    validates :user1_id, :user2_id, presence: true

    belongs_to :user_1,
        primary_key: :id,
        foreign_key: :user1_id,
        class_name: :User
    
    belongs_to :user_2,
        primary_key: :id,
        foreign_key: :user2_id,
        class_name: :user

    has_many :messages, :as => :messageable
    
end
