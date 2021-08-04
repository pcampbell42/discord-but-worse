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
            render :show
        else
            #this should never happen... no reason for server creation to fail... bad avatar?
            render json: @server.errors.full_messages, status: 422
        end
    end


    def update
        @server = Server.find_by(id: params[:id])

        if @server.update(server_params)
            render :show
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
        params.require(:server).permit(:name, :owner_id, :avatar)
    end


end
