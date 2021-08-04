# == Schema Information
#
# Table name: memberships
#
#  id         :bigint           not null, primary key
#  user_id    :integer          not null
#  server_id  :integer          not null
#  created_at :datetime         not null
#  updated_at :datetime         not null
#
class Membership < ApplicationRecord

    #--------------------- Validations ---------------------

    validates :user_id, :server_id, presence: true


    #--------------------- Associations ---------------------

    belongs_to :member,
        primary_key: :id,
        foreign_key: :user_id,
        class_name: :User

    belongs_to :server,
        primary_key: :id,
        foreign_key: :server_id,
        class_name: :Server

end
