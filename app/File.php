<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class File extends Model
{
    protected $guarded = [];
    protected static $safe_extensions = [
        'jpg', 'pdf', 'doc', 'docx', 'xls', 'xlsx', 'png', 'jpeg', 'gif', 'zip', 'tar', '7z',
        'odt', 'djvu', 'ods', 'pptx', 'odp', 'csv',
    ];
    protected $appends = ['url'];
    private $cachedHash = null;

    private static $error;

    public static function path($token = null)
    {
        return storage_path('/uploads'.($token ? "/$token" : ''));
    }
    public static function getError()
    {
        return self::$error;
    }

    public function storagePath()
    {
        return self::path($this->token);
    }

    public function link($absolute = false)
    {
        $path = act('file.download', $this->token);
        return $absolute ? absolutify($path) : $path;
    }

    public function users()
    {
        return $this->belongsToMany('App\User');
    }

    public function delete()
    {
        $filename = self::path($this->token);
        if (file_exists($filename)) {
            unlink($filename);
        }
        parent::delete();
    }

    public static function genToken()
    {
        return str_random(50);
    }

    public function size()
    {
        if (!is_file($this->storagePath())) {
            return 0;
        } else {
            return filesize($this->storagePath());
        }
    }

    public static function upload($f)
    {
        $token = self::genToken();
        if (is_url($f)) {
            $bytes = @copy($f, self::path($token));
            if (!$bytes || !is_file(self::path($token))) {
                self::$error = 'Impossibile scaricare il file.';
                return null;
            }
            $pu = parse_url($f);
            return self::create([
              'name' => basename($pu['path'] ?: 'noname-downloaded.jpg'),
              'token' => $token,
            ]);
        } else {
            if (is_string($f)) {
                $f = \Request::file($f);
            }

            if ($f == null) {
                self::$error = 'Nessun file caricato.';
                return null;
            }

            if (!$f->isValid()) {
                self::$error = 'Errore nel caricamento del file.';
                return false;
            }

            $f->move(self::path(), $token);
            return self::create([
              'name' => $f->getClientOriginalName(),
              'token' => $token,
            ]);
        }
    }

    protected function getUrlAttribute() {
        return $this->link(true);
    }

    public function getHash()
    {
        if (!$this->cachedHash) {
            $this->cachedHash = md5_file(self::storagePath());
        }
        return $this->cachedHash;
    }

}
