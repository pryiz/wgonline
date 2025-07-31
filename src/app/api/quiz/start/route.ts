import { NextRequest, NextResponse } from 'next/server';
import { twitchChatServerService } from '@/lib/twitch-chat-server';

export async function POST(request: NextRequest) {
  try {
    const { channelName } = await request.json();

    if (!channelName) {
      return NextResponse.json(
        { error: 'Nom de chaîne requis' },
        { status: 400 }
      );
    }

    console.log(`🎮 Démarrage du quiz pour ${channelName}`);

    // Vérifier que nous sommes connectés au chat
    if (!twitchChatServerService.isConnectedToChat()) {
      return NextResponse.json(
        { error: 'Non connecté au chat Twitch' },
        { status: 400 }
      );
    }

    return NextResponse.json({
      success: true,
      message: `Quiz démarré pour ${channelName}`,
      channel: channelName
    });

  } catch (error) {
    console.error('Erreur démarrage quiz:', error);
    return NextResponse.json(
      { error: 'Erreur lors du démarrage du quiz' },
      { status: 500 }
    );
  }
} 