class GroupsController < ApplicationController

  def new
  	@group = Group.new
  end

  def create
    @group = Group.new
    @group.save
  end

  def edit
    @group = Group.find
  end

  def update
     @group.update
  end

end