# == Schema Information
#
# Table name: servers
#
#  id         :bigint           not null, primary key
#  name       :string           not null
#  avatar     :string           not null
#  owner_id   :integer          not null
#  created_at :datetime         not null
#  updated_at :datetime         not null
#
class Server < ApplicationRecord

    #--------------------- Validations ---------------------

    validates :name, :avatar, :owner_id, presence: true
    validates :name, length: { minimum: 2, maximum: 30 }


    #--------------------- After initialize ---------------------

    after_initialize :set_default_avatar

    def set_default_avatar
        self.avatar ||= "123"
    end


    #--------------------- Associations ---------------------

    belongs_to :owner,
        primary_key: :id,
        foreign_key: :owner_id,
        class_name: :User

    has_many :memberships,
        primary_key: :id,
        foreign_key: :server_id,
        class_name: :Membership,
        dependent: :destroy
    
    has_many :members,
        through: :memberships,
        source: :member

end
