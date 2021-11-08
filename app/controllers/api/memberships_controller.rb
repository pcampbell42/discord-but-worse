class Api::MembershipsController < ApplicationController

    def create
        @membership = Membership.new(membership_params)
        @membership.user_id = current_user.id

        if @membership.save
            render :show
        else
            render json: @membership.errors.full_messages, status: 422
        end
    end


    def update
        @membership = Membership.find_by(id: params[:id])

        if @membership.update(membership_params)
            render :show
        else
            render json: @membership.errors.full_messages, status: 422
        end
    end


    def destroy
        @membership = Membership.find_by(id: params[:id])
        @membership.destroy
        render json: {}
    end


    private
    def membership_params
        params.require(:membership).permit(:server_id, :nickname)
    end

end
