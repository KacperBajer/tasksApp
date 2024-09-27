import { createTask, getTasks } from '@/lib/tasks';
import { NextRequest, NextResponse } from 'next/server';

export async function GET(request: NextRequest) {
  const page = request.headers.get('page') || 1
  const itemsPerPage = request.headers.get('itemsPerPage') || 20
  try {
    const response = await getTasks(parseInt((page as string)) - 1, parseInt(itemsPerPage as string));
    return NextResponse.json(response, { status: 200 });
  } catch (error) {
    console.error('Error fetching tasks:', error);
    return NextResponse.json({ error: 'Failed to fetch tasks' }, { status: 500 });
  }
}

export async function POST(request: NextRequest) {
  const {task, title, status, section, priority} = await request.json()
  try {
    const response = await createTask(task, title, status, section, priority);
    if(response === 200) {
      return NextResponse.json({ status: 200 });
    }
    return NextResponse.json({ error: 'Failed to fetch tasks' }, { status: 500 });
  } catch (error) {
    console.error('Error fetching tasks:', error);
    return NextResponse.json({ error: 'Failed to fetch tasks' }, { status: 500 });
  }
}