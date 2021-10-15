class Api::ServersController < ApplicationController

    def index
        @servers = Server.all
        render :index
    end


    def show
        @server = Server.find_by(id: params[:id])
        render "api/servers/show_details"
    end


    def create
        @server = Server.new(server_params)
        @server.owner_id = current_user.id
        
        if @server.save
            # Create membership for owner
            @membership = Membership.new(server_id: @server.id)
            @membership.user_id = current_user.id
            @membership.save

            # Create initial text channel
            @text_channel = TextChannel.new(name: "general", server_id: @server.id)
            @text_channel.save
            
            render :show
        else
            render json: @server.errors.full_messages, status: 422
        end
    end


    def update
        @server = Server.find_by(id: params[:id])

        if @server.update(server_params)
            render "api/servers/show_update"
        else
            render json: @server.errors.full_messages, status: 422
        end
    end


    def destroy
        @server = Server.find_by(id: params[:id])
        @server.destroy
        render json: {}
    end


    private
    def server_params
        params.require(:server).permit(:name, :owner_id, :photo)
    end

end
