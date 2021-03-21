import discord
from loguru import logger
from discord.ext import commands, tasks
from utils import get_config
from threading import Thread
from skybot import Skybot



config = get_config()
if not config:
    print("No config found!")
    exit()


bot = commands.Bot(command_prefix="None")

@bot.event
async def on_ready():
    skybot = bot.guilds[0].get_member(config["skybot"]["id"])
    if skybot.status == discord.Status.offline:
        #dm owners
        for _id in config["downdetector"]["owners"]:
            user = bot.get_user(_id)
            try:
                await user.send("Skybot is down!")
            except discord.Forbidden:
                pass
        skybot = Skybot()
        skybot.run(config["skybot"]["token"])
        
    else:
        pass
    check_status.start()

@tasks.loop(seconds=30)
async def check_status():
    try:
        skybot = bot.guilds[0].get_member(config["skybot"]["id"])
        if skybot.status == discord.Status.offline:
            #dm owners
            for _id in config["downdetector"]["owners"]:
                user = bot.get_user(_id)
                try:
                    await user.send("Skybot is down!")
                except discord.Forbidden:
                    pass
            if not p.is_alive():
                p.run()
        else:
            p.close()
           
    except Exception as e:
        logger.info(e)
    
bot.run(config["downdetector"]["token"])