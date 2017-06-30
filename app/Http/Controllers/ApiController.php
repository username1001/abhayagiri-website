<?php

namespace App\Http\Controllers;

use Carbon\Carbon;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

use App\Http\Controllers\Controller;

class ApiController extends Controller
{

    public function getPage(Request $request, $page_slug)
    {
        $page = $this->getPageFromSlug($page_slug);
        $subpages = DB::table('subpages')->where([
            'page' => $page->url_title,
            'language' => 'English', # TODO figure out Thai language
        ])->get();
        return response()->json([
            'page_title' => $page->title,
            'page_body' => $page->body,
            'page_icon' => $page->icon,
            'banner_url' => $this->getBannerUrl($page),
            'subpages' => $this->remapKeys($subpages, [
                'url_title' => 'slug',
                'body' => 'page_body',
                'title' => 'page_title',
            ]),
        ]);
    }

    public function getSubPage(Request $request, $page_slug, $subpage_slug)
    {
        $page = $this->getPageFromSlug($page_slug);
        $subpage = DB::table('subpages')->where([
            'page' => $page->url_title,
            'url_title' => $subpage_slug,
        ])->first();
        if (!$subpage) {
            abort(404);
        }
        return response()->json([
            'page_title' => $subpage->title,
            'page_body' => $subpage->body,
        ]);
    }

    public function getTalks(Request $request)
    {
        $authorId = $request->input('author');
        $startDate = $request->input('startDate');
        $endDate = $request->input('endDate');
        $genre = $request->input('genre'); // TODO
        $page = (int) $request->input('page');
        $pageSize = (int) $request->input('pageSize');
        $filter = $request->input('filter');
        $talks = DB::table('audio');
        if ($authorId) {
            $author = DB::table('authors')->where(['id' => $authorId])->first();
            $talks = $talks->where('author', '=', $author ? $author->title : null);
        }
        if ($startDate) {
            $talks = $talks->where('date', '>=', Carbon::createFromTimestamp((int) $startDate));
        }
        if ($endDate) {
            $talks = $talks->where('date', '<', Carbon::createFromTimestamp((int) $endDate));
        }
        if ($page < 1) {
            $page = 1;
        }
        if ($pageSize < 1 || $page > 1000) {
            // TODO better logic
            $pageSize = 2;
        }
        $talks = $talks
            ->orderBy('date', 'desc')
            ->offset(($page - 1) * $pageSize)
            ->limit($pageSize);
        $talks = $this->remapKeys($talks->get(), [
            'body' => 'description',
        ])->map(function($talk) {
            $talk['author'] = DB::table('authors')->where(['title' => $talk['author']])->first();
            $talk['media_url'] = '/media/audio/' . $talk['mp3'];
            return $talk;
        });
        return response()->json($talks);
    }

    protected function getPageFromSlug($page_slug)
    {
        $page = DB::table('pages')->where([
            'url_title' => $page_slug,
        ])->first();
        if ($page) {
            return $page;
        } else {
            abort(404);
        }
    }

    protected function getBannerUrl($page)
    {
        $path = 'media/images/banner/' . $page->url_title . '.jpg';
        if (file_exists(public_path($path))) {
            return '/' . $path;
        } else {
            return '/media/images/banner/home.jpg';
        }
    }

    protected function remapKeys($collection, $mapping)
    {
        // Remap url_title -> slug
        return $collection->map(function ($item, $key) use ($mapping) {
            $item = (array) $item;
            foreach ($mapping as $oldKey => $newKey) {
                if (array_key_exists($oldKey, $item)) {
                    $item[$newKey] = $item[$oldKey];
                    unset($item[$oldKey]);
                }
            }
            return $item;
        });
    }

}