import discord
from discord.ext import commands

class Skybot(commands.Bot):

    def __init__(self):
        super().__init__(command_prefix="NONE")
        
    async def on_ready(self):
        skybot.change_presence(activity=discord.Game("CURRENTLY UNAVAILABLE!"))

    
        
