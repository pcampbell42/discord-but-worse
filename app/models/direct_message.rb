# == Schema Information
#
# Table name: direct_messages
#
#  id           :bigint           not null, primary key
#  user1_id     :integer          not null
#  user2_id     :integer          not null
#  created_at   :datetime         not null
#  updated_at   :datetime         not null
#  user1_hidden :boolean          not null
#  user2_hidden :boolean          not null
#
class DirectMessage < ApplicationRecord

    #--------------------- Validations ---------------------

    validates :user1_id, :user2_id, presence: true
    validates :user1_hidden, :user2_hidden, inclusion: { in: [ true, false ] }


    #--------------------- After Initialize ---------------------

    after_initialize :set_hidden

    def set_hidden
        self.user1_hidden ||= false
        self.user2_hidden ||= false
    end


    #--------------------- Associations ---------------------

    belongs_to :initiator,
        primary_key: :id,
        foreign_key: :user1_id,
        class_name: :User
    
    belongs_to :receiver,
        primary_key: :id,
        foreign_key: :user2_id,
        class_name: :User

    has_many :messages, :as => :messageable,
        dependent: :destroy

end
