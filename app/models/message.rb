# == Schema Information
#
# Table name: messages
#
#  id               :bigint           not null, primary key
#  body             :text             not null
#  author_id        :integer          not null
#  messageable_type :string           not null
#  messageable_id   :bigint           not null
#  created_at       :datetime         not null
#  updated_at       :datetime         not null
#
class Message < ApplicationRecord

    #--------------------- Validations ---------------------

    validates :body, :author_id, :messageable_id, :messageable_type, presence: true
    validates :pinned, inclusion: { in: [ true, false ] }


    #--------------------- Placeholder after initialize ---------------------

    after_initialize :placeholder_set_messageable, :set_pinned

    def placeholder_set_messageable
        self.messageable_id ||= 1
        self.messageable_type ||= "TextChannel"
    end

    def set_pinned
        self.pinned ||= false
    end


    #--------------------- Relations ---------------------

    belongs_to :author,
        primary_key: :id,
        foreign_key: :author_id,
        class_name: :User

    belongs_to :messageable, :polymorphic => true

end
